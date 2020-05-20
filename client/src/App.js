import React from 'react';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './helpers/ProtectedRoute';
import './app.scss';

const App = () => {
    return (
        <div className="wrapper">
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <ProtectedRoute path="/signup">
                    <Signup />
                </ProtectedRoute>
                <ProtectedRoute path="/:route">
                    <Home />
                </ProtectedRoute>
            </Switch>
        </div>
    );
};

export default App;
