import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Preloader from './Preloader';

const ProtectedRoute = ({path, isChecking, isLoggedIn, children}) => {
  return (
    <Route path={path} exact>
      { isChecking ? (
        <main className='content'>
          <Preloader />
        </main>
      ) : (
        isLoggedIn ? children : <Redirect to="/signin" />
      )}
    </Route>
)}

export default ProtectedRoute;