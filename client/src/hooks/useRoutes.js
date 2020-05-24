import React from 'react';
import Home from '../components/home/Home';
import Landing from '../components/landing/Landing';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import { Switch, Route, Redirect } from 'react-router-dom';

const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Redirect to="/home" />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};

export default useRoutes;
