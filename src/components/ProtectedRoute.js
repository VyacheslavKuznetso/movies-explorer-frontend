import React from 'react';
import { Navigate } from "react-router-dom";
import {LoggedInContext} from '../contexts/CurrentUserContext'

const ProtectedRouteElement = ({ children, ...props }) => {

  const loggedIn = React.useContext(LoggedInContext);

  return (
    loggedIn ? children : <Navigate to="/" replace />
  )

}

export default ProtectedRouteElement;