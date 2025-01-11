import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { joinEvent, getReservedUsers, endEvent } from "../features/event/eventActions";
import { closeReservedUserModal } from "../features/event/eventSlice";

function ManageEventCard({ event }) {
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { reservedusers, reserved_user_modal } = useSelector(state => state.event);

  const handleCloseModal = () => {
    dispatch(closeReservedUserModal());
  };

  const handleModal = async () => {
    try {
      await dispatch(getReservedUsers(event));
    } catch (error) {
      console.error("Error fetching reserved users:", error);
      alert("Error fetching users, please try again.");
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleEndEvent = async () => {
    if (window.confirm("Do you want to continue?")) {
      dispatch(endEvent({ eventId: event.eventid, userIds: selectedUsers }));
    }
  };

  return (

    <div className="mina-poap-manage-event-card">
     <img src={event.eventimagelink} alt={event.eventtitle} className="mina-poap-manage-event-image" />
     <div className="mina-poap-manage-event-content">
       <h2 className="mina-poap-manage-event-title">{event.eventtitle}</h2>
       <p className="mina-poap-manage-event-description">{event.description}</p>
       <p className="mina-poap-event-date">Available Slots: {event.availableslots}</p>

       <div className={`mina-poap-manage-event-status ${event.eventstatus}`}>
         {event.eventstatus === 'active' ? 'Active' : 'Ended'}
       </div>
       {event.eventstatus === 'active' && (
         <button className="mina-poap-manage-event-end"  onClick={handleModal}>
           End Event
         </button>
       )}
     </div>

     {reserved_user_modal && (
       <div className="mina-poap-manage-event-popup">
         <div className="mina-poap-manage-event-popup-content">
           <h3 className="mina-poap-manage-event-popup-title">Confirm Attendees</h3>
           <ul className="mina-poap-manage-event-attendee-list">
             {reservedusers.map(user => (
               <li key={user.email} className="mina-poap-manage-event-attendee-item">
                 <label className="mina-poap-manage-event-attendee-label">
                   <input
                     type="checkbox"
                     checked={selectedUsers.includes(user.id)}
                     onChange={() => handleCheckboxChange(user.id)}
                     className="mina-poap-manage-event-attendee-checkbox"
                   />
                   {user.email}
                 </label>
               </li>
             ))}
           </ul>
           <div className="mina-poap-manage-event-popup-actions">
             <button onClick={handleEndEvent} className="mina-poap-manage-event-popup-confirm">
               Confirm
             </button>
             <button onClick={handleCloseModal} className="mina-poap-manage-event-popup-cancel">
               Cancel
             </button>
           </div>
         </div>
       </div>
     )}
     {/*<div className="poap-event-card">
       <div className="poap-event-content">
         <h2 className="poap-event-title">{event.eventname}</h2>
         <div className="poap-event-description">{event.eventstatus}</div>
         <p className="poap-event-description">{event.description}</p>
         <p className="poap-event-date">Available Slots: {event.availableslots}</p>

         <button
           onClick={handleModal}
           className="text-blue-500 hover:underline mt-3"
         >
           End Event
         </button>
       </div>

       {reserved_user_modal && (
         <div className="manage-modal">
           <div className="manage-modal-content">
             <h2>Reserved Users</h2>
             <ul>
               {reservedusers.map(user => (
                 <li key={user.id}>
                   <label>
                     <input
                       type="checkbox"
                       checked={selectedUsers.includes(user.id)}
                       onChange={() => handleCheckboxChange(user.id)}
                     />
                     {user.username} ({user.email})
                   </label>
                 </li>
               ))}
             </ul>
             <button onClick={handleEndEvent} className="btn btn-primary">End Event</button>
             <button onClick={handleCloseModal} className="btn btn-secondary">Cancel</button>
           </div>
         </div>
       )}
     </div>*/}
         </div>



  );
}

export default ManageEventCard;
