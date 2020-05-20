import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />}></Route>
);

export default ProtectedRoute;
