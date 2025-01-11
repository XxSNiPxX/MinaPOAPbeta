import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './css/style.css';
import { jwtDecode } from "jwt-decode";

// Import Redux actions
import { getAllEvents,getUserEvents,getReservedEvents } from './features/event/eventActions';

// Import pages
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import ShowEvents from './pages/ShowEvents';
import ManageEvents from './pages/ManageEvents';
import YourEvents from './pages/YourEvents';
import ClaimedNFTs from './pages/ClaimedNFTs';

import LoginScreen from './pages/login';
import RegisterScreen from './pages/register';
import Layout from './pages/layout';
import ProtectedRoute from './pages/protectedroutes';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  // const { success } = useSelector((state) => state.event);
  // const { events } = useSelector((state) => state.events);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading
// console.log(events)
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';

    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }

    if (isLoggedIn) {
      dispatch(getAllEvents()); // Fetch events when the user is logged in
      dispatch(getUserEvents()); // Fetch events when the user is logged in
      dispatch(getReservedEvents())

    }

    setLoading(false); // Set loading to false after JWT check
  }, [location.pathname, isLoggedIn, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // You can customize the loading state here
  }
 // console.log(events)
  return (
    <>
      {isLoggedIn ? (
        <>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/events" element={<ShowEvents />} />
              <Route path="/manage-events" element={<ManageEvents />} />
              <Route path="/your-events" element={<YourEvents />} />
              <Route path="/your-nfts" element={<ClaimedNFTs />} />


            </Routes>
          </Layout>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      )}
    </>
  );
}

export default App;
