import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../components/EventCard';  // A component to render individual event details
import Datepicker from '../components/Datepicker';
import { joinEvent } from "../features/event/eventActions"; // Assuming you have this action created


function ShowEvents() {

  // Select events from the Redux store
  const { events, loading, error } = useSelector(state => state.event);
  console.log(events)
  const dispatch = useDispatch();

  const handleJoinEvent = (e) => {
    dispatch(joinEvent(e))
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
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">All Events</h1>
        </div>


      </div>

      {/* Events grid */}

      <div className="poap-events-grid">
        {events.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No Events</div>
        ):(events.map((event) => (
          <div key={event.eventid} className="poap-event-card">
            <img src={event.eventimagelink} alt={event.eventname} className="poap-event-image" />
            <div className="poap-event-content">
              <h2 className="poap-event-title">{event.eventname}</h2>

              <p className="poap-event-description">{event.description}</p>
              <p className="poap-event-description">Available Slots: {event.availableslots}</p>
              <p className="poap-event-description">User Info: {event.eventinformation}</p>
              {event.eventstatus === 'ended' ? (
                  <button
                    className="text-gray-500 mt-3 cursor-not-allowed"
                    disabled
                  >
                    Event Ended
                  </button>
                ) : (
                  <button
                    className="text-blue-500 hover:underline mt-3"
                    onClick={() => handleJoinEvent(event)}
                  >
                    Join Event
                  </button>
                )}
            </div>
          </div>
        )))}
      </div>

    {/* <div className="grid grid-cols-12 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">Loading events...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">Error loading events: {error}</div>
        ) : (
          events.map(event => (
            <div key={event.id} className="col-span-12 sm:col-span-6 xl:col-span-4">
              <EventCard event={event} />
            </div>
          ))
        )}
      </div> */}
    </div>
  );
}

export default ShowEvents;
