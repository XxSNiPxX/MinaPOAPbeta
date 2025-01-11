import React from 'react';
import { useDispatch } from "react-redux";
import { claimEvent } from "../features/event/eventActions"; // Assuming you have this action created


function YourEventsCard({ event, onJoinEvent }) {
  const dispatch = useDispatch();

  const handleJoinEvent = () => {
    dispatch(claimEvent(event))
      .then((response) => {
        console.log("das",response)

        // Redirect or show success message
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("Error creating event, please try again.");
      });
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{event.eventname}</h2>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{event.eventstatus}</div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{event.description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Available Slots: {event.availableslots}</p>

        <button
          onClick={handleJoinEvent}
          className="text-blue-500 hover:underline mt-3"
        >
          Claim
        </button>
      </div>
    </div>
  );
}

export default YourEventsCard;
