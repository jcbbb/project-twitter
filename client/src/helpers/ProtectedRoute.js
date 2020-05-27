import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ ...props }) => {
    const { isAuthenticated } = useContext(UserContext);

    return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
