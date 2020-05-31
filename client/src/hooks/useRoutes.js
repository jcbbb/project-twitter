import React from 'react';
import Home from '../components/home/Home';
import Landing from '../components/landing/Landing';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import LogoutModal from '../components/logoutModal/LogoutModal';
import Profile from '../components/profile/Profile';
import Nav from '../components/nav/Nav';
import { Switch, Route, Redirect } from 'react-router-dom';

const routes = [
    {
        path: '/home',
        exact: true,
        nav: () => <Nav />,
        main: () => <Home />,
    },
    {
        path: '/logout',
        exact: true,
        nav: () => <Nav />,
        main: () => <LogoutModal />,
    },
    {
        path: '/:handle',
        exact: true,
        nav: () => <Nav />,
        main: () => <Profile />,
    },
];
const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <>
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact}>
                            {route.nav}
                        </Route>
                    ))}
                    <Redirect to="/home" />
                </Switch>
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact}>
                            {route.main}
                        </Route>
                    ))}
                    <Redirect to="/home" />
                </Switch>
            </>
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
