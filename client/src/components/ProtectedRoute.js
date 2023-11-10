// /src/components/auth/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { getUserRole, isAuthenticated, logoutUser } from '../utils';
import Appbar from './Appbar';

const ProtectedRoute = ({ children, accessRoal, isHowHeader, cartItemsCount }) => {
  const navigate = useNavigate();
//   const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isAuthenticated() ||!(accessRoal.includes(getUserRole()))) {
        // Set the state to true to trigger redirection
        logoutUser()
        // setShouldRedirect(true);
      }
    };

    checkAuthentication();
  }, []);

  // Render nothing while navigating
//   if (shouldRedirect) {
//     navigate('/');
//     return null;
//   }

  // Render the component
  return <>
  {isHowHeader&&<Appbar title="Test Shop" cartItemsCount={cartItemsCount} />}
  {children}</>;
};

export default ProtectedRoute;
