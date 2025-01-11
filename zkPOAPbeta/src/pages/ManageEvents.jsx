import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageEventCard from '../components/ManageEventCard';  // A component to render individual event details
import Datepicker from '../components/Datepicker';

function ManageEvents() {

  // Select events from the Redux store
  const { userevents, loading, error } = useSelector(state => state.event);
  console.log(userevents);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Manage Events</h1>
        </div>
      </div>

      {/* Events grid */}
      <div  className="manage-poap-events-grid">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">Loading events...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">Error loading events: {error}</div>
        ) : userevents.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No events to manage</div>
        ) : (
          userevents.map(event => (
              <ManageEventCard event={event} />
          ))
        )}
      </div>
    </div>
  );
}

export default ManageEvents;
