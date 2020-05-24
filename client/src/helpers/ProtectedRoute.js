import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ ...props }) => {
    const auth = useContext(AuthContext);

    return auth.isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
