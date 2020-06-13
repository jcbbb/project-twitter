import React from 'react';
import Home from '../components/home/Home';
import Landing from '../components/landing/Landing';
import Login from '../components/login/Login';
import Explore from '../components/explore/Explore';
import Signup from '../components/signup/Signup';
import LogoutModal from '../components/logoutModal/LogoutModal';
import Profile from '../components/profile/Profile';
import Nav from '../components/nav/Nav';
import Sidebar from '../components/sidebar/Sidebar';
import { Switch, Route, Redirect } from 'react-router-dom';

const routes = [
    {
        path: '/home',
        exact: true,
        nav: () => <Nav />,
        main: () => <Home />,
        sidebar: () => <Sidebar />,
    },
    {
        path: '/explore',
        exact: true,
        nav: () => <Nav />,
        main: () => <Explore />,
        sidebar: () => <Sidebar />,
    },
    {
        path: '/logout',
        exact: true,
        main: () => <LogoutModal />,
    },
    {
        path: '/:handle',
        nav: () => <Nav />,
        main: () => <Profile />,
        sidebar: () => <Sidebar />,
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
                </Switch>
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact}>
                            {route.sidebar}
                        </Route>
                    ))}
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
