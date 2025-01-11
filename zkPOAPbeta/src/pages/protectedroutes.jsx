// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom'; // or use your router library
// import { useAuth } from './authContext'; // Custom hook to check authentication

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = true;
  console.log(isAuthenticated)

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signin" />
        )
      }
    />
  );
};

export default ProtectedRoute;
