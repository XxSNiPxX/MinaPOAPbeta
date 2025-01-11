import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../components/EventCard';  // A component to render individual event details
import Datepicker from '../components/Datepicker';
import { joinEvent } from "../features/event/eventActions"; // Assuming you have this action created

function ClaimedNFTs() {
  // Select events from the Redux store
  const { claimedevents, loading, error } = useSelector(state => state.event);
  console.log(claimedevents)
  const dispatch = useDispatch();

  const handleJoinEvent = (e) => {
    // Add your event join logic here
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Your NFTs</h1>
        </div>
      </div>

      {/* Events grid */}
      <div className="poap-events-grid">
        {claimedevents.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No NFTs</div>
        ) : (
          claimedevents.map((data) => (
            <div key={data.event.eventid} className="poap-event-card">
              <img src={data.event.eventimagelink} alt={data.event.eventtitle} className="poap-event-image" />
              <div className="poap-event-content">
                <h2 className="poap-event-title">{data.event.eventtitle}</h2>
                <p className="poap-event-description">{data.event.description}</p>
                <p className="poap-event-description">Available Slots: {data.event.availableslots}</p>
                <p className="poap-event-description">User Info: {data.event.userinfo}</p>
                <button
                  className="text-blue-500 hover:underline mt-3"
                  onClick={() => window.location.href = `https://minascan.io/devnet/tx/${data.registration.transactionHash}`}
                >
                  View Transaction
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClaimedNFTs;
