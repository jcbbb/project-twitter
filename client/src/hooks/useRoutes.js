import React from 'react';
import Home from '../components/home/Home';
import Landing from '../components/landing/Landing';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import LogoutModal from '../components/logoutModal/LogoutModal';
import { Switch, Route, Redirect } from 'react-router-dom';

const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route path="/logout">
                    <LogoutModal />
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
