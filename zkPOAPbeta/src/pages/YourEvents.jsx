import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YourEventsCard from '../components/YourEventsCard';  // A component to render individual event details
import Datepicker from '../components/Datepicker';
import { claimEvent } from "../features/event/eventActions"; // Assuming you have this action created

function YourEvents() {

  // Select events from the Redux store
  const { alleventsjoined,unclaimedevents, loading, error } = useSelector(state => state.event);
  console.log(unclaimedevents)
  const dispatch = useDispatch();

  const handleJoinEvent = async (event) => {
    if (typeof window.mina !== 'undefined') {
      console.log('Auro Wallet is installed!');
    }
    const account = await window.mina.requestAccounts()

console.log(account)

  console.log(account);

    dispatch(claimEvent({eventData:event,account:account[0]}))
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

    <div className="mina-poap-your-events">
      <div className="mina-poap-your-events-table-container">
        <h2 className="mina-poap-your-events-title">All Events Joined</h2>
        <table className="mina-poap-your-events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {alleventsjoined.map(data => (

              <tr key={data.event.eventid}>
                <td>{data.event.eventid}</td>
                <td>{data.event.eventname}</td>
                <td className={`mina-poap-your-events-status ${data.event.eventstatus}`}>
                  {data.event.eventstatus}
                </td>


                <td >
                  {data.registration.reward}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mina-poap-your-events-table-container">
        <h2 className="mina-poap-your-events-title">Claimable Events</h2>
        <table className="mina-poap-your-events-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Event Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unclaimedevents.map(data => (
              <tr key={data.event.eventid}>
                <td>{data.event.eventid}</td>
                <td>{data.event.eventname}</td>
                <td className={`mina-poap-your-events-status ${data.event.eventstatus}`}>
                  {data.event.eventstatus}
                </td>
                <td>
                  <button onClick={() => handleJoinEvent(data.event)}  className="mina-poap-your-events-claim">Claim</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
}

export default YourEvents;
