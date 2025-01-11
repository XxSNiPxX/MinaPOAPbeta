import React from 'react';
import { useDispatch } from "react-redux";
import { joinEvent } from "../features/event/eventActions"; // Assuming you have this action created

function EventCard({ event }) {
  const dispatch = useDispatch();

  const handleJoinEvent = () => {
    dispatch(joinEvent(event))
      .then((response) => {
        console.log("Response:", response);
        // Redirect or show success message
      })
      .catch((error) => {
        console.error("Error joining event:", error);
        alert("Error joining event, please try again.");
      });
  };

  return (

    <div key={poap.id} className="poap-event-card">
    <img src={event.eventimagelink} alt="Event" className="poap-event-image" />
    <div className="poap-event-content">
      <h2 className="poap-event-title">{event.eventname}</h2>
      <div className="text-sm font-medium text-gray-500">{event.eventstatus}</div>
      <p className="poap-event-description">{event.description}</p>
      <p className="text-sm text-gray-600">Available Slots: {event.availableslots}</p>
      <p className="text-sm text-gray-600">User Info: {event.userinfo}</p>
      <button
        onClick={handleJoinEvent}
        className="text-blue-500 hover:underline mt-3"
      >
        Join Event
      </button>
    </div>
          </div>

  );
}

export default EventCard;
