const db = require("../models");
const Event = db.event;
const EventReservation = db.eventregistration;
require('ts-node/register');  // This enables TypeScript execution in Node.js
const { mint } = require('../minanft/mint.ts'); // Import compiled JS


exports.getEvents = async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.findAll();

    // Return the events to the client
    res.status(200).json({
      message: "Events retrieved successfully",
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      message: "An error occurred while fetching the events",
      error: error.message,
    });
  }
};


exports.getUserEvents = async (req, res) => {
  const { userId } = req.body; // Assuming eventId and userId are sent in the body

  try {
    // Fetch all events from the database
    Event.findAll({
      where: {
        creatorId: userId // Match the creatorId with the user's ID
      }
    })
    .then(events => {
      console.log(events); // This will print the events created by the user
      res.status(200).json({
        message: "Events retrieved successfully",
        events,
      });
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      res.status(500).json({
        message: "An error occurred while fetching the events",
        error: error.message,
      });
    });
    // Return the events to the client

  } catch (error) {
    console.error("Error fetching events:", error);

  }
};


exports.joinEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body; // Assuming eventId and userId are sent in the body

    // Fetch the event from the database
    const event = await Event.findOne({ where: { eventid: eventId } });

    // Check if the event exists
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check if the event has available slots
    if (event.availableslots <= 0) {
      return res.status(400).json({
        message: "No available slots for this event",
      });
    }

    // Check if the user is already registered for this event
    const existingReservation = await EventReservation.findOne({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "User already joined this event",
      });
    }

    // Create a new EventReservation entry
    await EventReservation.create({
      userId: userId,
      eventId: eventId,
    });

    // Decrease available slots by 1 and increase reserved spots by 1
    event.availableslots -= 1;
    event.reservedspots += 1;

    // Update the event in the database
    await event.save();

    res.status(200).json({
      message: "User joined the event successfully",
      event,
    });
  } catch (error) {
    console.error("Error joining event:", error);
    res.status(500).json({
      message: "An error occurred while joining the event",
      error: error.message,
    });
  }
};


exports.createEvent = async (req, res) => {
  console.log("HERE",req.body,req.file)
  try {
    // Extract event details from the request body
    const { name, description, userinfo, totalslots } = req.body;
    const userId = req.body.userid; // Assuming req.userid is sent by the user

    // Ensure required fields are provided
    if (!name || !description || !userId || !totalslots) {
      return res.status(400).send({ message: "User ID, name, description, and total slots are required" });
    }

    // Initialize other fields with default values if not provided
    const availableslots = totalslots; // Assume available slots start as the total slots
    const reservedusers = []; // Reserved users will be an empty array initially
    const eventstatusVal = "active"; // Default to "active" if not provided
    const imagePath = req.file ? `http://localhost:8100/${req.file.filename}` : null; // Image path if file uploaded

    // Create a new event in the database
    const newEvent = await Event.create({
      eventid: `${Date.now()}`, // Generate a unique event ID based on timestamp (or use another method)
      eventname: name,
      description,
      creatorId: userId, // Set the user ID of the creator
      reservedspots: 0, // Default to 0 reserved spots if not provided
      totalslots,
      availableslots,
      eventstatus: eventstatusVal,
      eventinformation: userinfo || "", // If userinfo is provided, use it, else default to an empty string
      eventimagelink:imagePath,
    });
    console.log(newEvent)
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      message: "An error occurred while creating the event",
      error: error.message,
    });
  }
};


exports.getReservedEvents = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is sent in the body
    const allreservations = await EventReservation.findAll({
          where: {
            userId: userId,
          },
          include: [
            {
              model: Event,
              as: 'event',
            },
          ],
        });
    // Fetch reservations where the reward is claimed, unclaimed, or pending
    const claimedReservations = await EventReservation.findAll({
      where: {
        userId: userId,
        reward: 'claimed',
      },
      include: [
        {
          model: Event,
          as: 'event',
        },
      ],
    });

    const unclaimedReservations = await EventReservation.findAll({
      where: {
        userId: userId,
        reward: 'unclaimed',
      },
      include: [
        {
          model: Event,
          as: 'event',
        },
      ],
    });

    const pendingReservations = await EventReservation.findAll({
      where: {
        userId: userId,
        reward: 'pending',
      },
      include: [
        {
          model: Event,
          as: 'event',
        },
      ],
    });

    // Format the results to include both event and reservation details
    const claimedEvents = claimedReservations.map((reservation) => ({
      event: reservation.event,
      registration: reservation,
    }));
    const unclaimedEvents = unclaimedReservations.map((reservation) => ({
      event: reservation.event,
      registration: reservation,
    }));
    const pendingEvents = pendingReservations.map((reservation) => ({
      event: reservation.event,
      registration: reservation,
    }));
    const allEvents = allreservations.map((reservation) => ({
          event: reservation.event,
          registration: reservation,
        }));
    res.status(200).json({
      message: "Reserved events retrieved successfully",
      claimedEvents,
      unclaimedEvents,
      pendingEvents,
      allEvents,
    });
  } catch (error) {
    console.error("Error fetching reserved events:", error);
    res.status(500).json({
      message: "An error occurred while fetching the reserved events",
      error: error.message,
    });
  }
};

exports.endEvent = async (req, res) => {
  try {
    const { eventId, userId, userIds } = req.body; // eventId, userId (creator), and userIds are sent in the body

    // Check if the event exists and is created by the user
    const event = await Event.findOne({ where: { eventid: eventId, creatorId: userId } });
    console.log(event.status,event)
    if (!event) {
      return res.status(500).json({
        message: "Event not found or you are not authorized to end this event",
      });
    }
    if (event.eventstatus=='ended') {
      return res.status(500).json({
        message: "Event already ended",
      });
    }
    // Fetch all event reservations for the particular event
    const reservations = await EventReservation.findAll({
      where: { eventId },
    });

    // Filter out the reservations that are not in the passed user IDs
    const validReservations = reservations.filter(reservation =>
      userIds.includes(reservation.userId)
    );

    // Remove the invalid reservations
    const invalidReservations = reservations.filter(reservation =>
      !userIds.includes(reservation.userId)
    );

    await Promise.all(
      invalidReservations.map(async (reservation) => {
        await reservation.destroy();
      })
    );

    // Update the event as ended
    event.eventstatus = "ended";
    await event.save();

    res.status(200).json({
      message: "Event ended successfully",
      remainingReservations: validReservations,
      event:event,
    });
  } catch (error) {
    console.error("Error ending event:", error);
    res.status(500).json({
      message: "An error occurred while ending the event",
      error: error.message,
    });
  }
};


exports.getReservedUsers = async (req, res) => {
  try {
    console.log(req.body)
    const { eventId } = req.body; // Assuming eventId is sent as a URL parameter
    console.log("HEREEEEEEE")
    // Fetch all event reservations for the given event ID
    const reservations = await EventReservation.findAll({
      where: { eventId },
      include: [
        {
          model: db.user, // Assuming there's a User model to get user details
          as: 'user',
          attributes: ['id', 'username', 'email'], // Fetch only necessary user attributes
        },
      ],
    });

    // Check if there are any reservations for the event
    if (reservations.length === 0) {
      return res.status(404).json({
        message: "No reservations found for this event",
      });
    }

    // Extract user details from the reservations
    const reservedUsers = reservations.map(reservation => reservation.user);
    console.log("HERE BOI")
    res.status(200).json({
      message: "Reserved users retrieved successfully",
      users: reservedUsers,
    });
  } catch (error) {
    console.error("Error fetching reserved users:", error);
    res.status(500).json({
      message: "An error occurred while fetching the reserved users",
      error: error.message,
    });
  }
};
async function retryMint(eventname, userId, description,account, retries = 10) {
    const transformedEventName = eventname.toLowerCase().replace(/ /g, '_');
    let attempt = 0;

    while (attempt < retries) {
        try {
            let result = await mint(transformedEventName, userId, description,account);
            if (result.success) {
                console.log("Mint successful");
                return result; // Stop retrying if mint is successful
            } else {
                console.error(`Mint attempt ${attempt + 1} failed: ${result.message}`);
            }
        } catch (error) {
            console.error(`Mint attempt ${attempt + 1} failed with error:`, error);
        }

        attempt++;

        if (attempt === retries) {
            throw new Error("Mint failed after all retries");
        }
    }
}





exports.claimReward = async (req, res) => {
  try {
    const { eventId, userId,account } = req.body;
    const event = await Event.findOne({ where: { eventid: eventId } });

    if (!event) {
      return res.status(500).json({ message: "No event found" });
    }
    if (event.eventstatus !== 'ended') {
      return res.status(500).json({ message: "Event is still active. Cannot claim reward." });
    }

    const reservation = await EventReservation.findOne({ where: { userId, eventId } });

    if (!reservation) {
console.log( "User is not registered for this event." )
    }
    if (reservation.reward !== 'unclaimed') {
      console.log("Reward has already been claimed.")
    }

    // Attempt to mint with retries
    let result;
    try {
       result = await retryMint(event.eventname, userId.toString(), event.description,account);
      console.log(result.result.hash)
    } catch (error) {
      console.log(result);
    }

    reservation.reward = 'claimed';
    reservation.transactionHash=result.result.hash;
    await reservation.save();
    console.log("Updated")


  } catch (error) {
    console.log(error)
  }
};


exports.claimRewardPending = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    const reservation = await EventReservation.findOne({ where: { userId, eventId } });

    if (!reservation) {
      return { success: false, reservation };
    }
    if (reservation.reward !== 'unclaimed') {
      return { success: false, reservation };
    }

    // Attempt to mint with retries

    reservation.reward = 'pending';
    await reservation.save();

    return { success: true, reservation };

  } catch (error) {
    console.log(error)
    return { success: false, reservation };
  }
};
