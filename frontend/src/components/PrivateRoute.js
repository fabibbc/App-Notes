// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import  AuthContext from '../context/AuthContext'; // Import the AuthContext

const PrivateRoute = () => {  // Destructure 'children' from props
  const { user } = useContext(AuthContext); // Get the user from context

  // If the user is not authenticated, redirect to login page
  if (!user) {
    console.log('no user');
    return <Navigate to="/login" />;
  }

};

export default PrivateRoute;