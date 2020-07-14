import React from 'react';
import Home from '../components/home/Home';
import Landing from '../components/landing/Landing';
import Login from '../components/login/Login';
import Explore from '../components/explore/Explore';
import Notifications from '../components/notifications/Notifications';
import Bookmarks from '../components/bookmarks/Bookmarks';
import Messages from '../components/messages/Messages';
import Lists from '../components/lists/Lists';
import Signup from '../components/signup/Signup';
import Modal from '../components/modal/Modal';
import Profile from '../components/profile/Profile';
import Nav from '../components/nav/Nav';
import Sidebar from '../components/sidebar/Sidebar';
import Status from '../components/status/Status';
import TweetCompose from '../components/tweetCompose/TweetCompose';
import FooterNav from '../components/footerNav/FooterNav';
import { ReactComponent as TwitterWhiteIcon } from '../assets/icons/twitter-white.svg';
import { Switch, Route, Redirect } from 'react-router-dom';

const routes = [
    {
        path: '/home',
        exact: true,
        nav: () => <Nav />,
        main: () => <Home title="Home" />,
        sidebar: () => <Sidebar />,
    },
    {
        path: '/explore',
        exact: true,
        nav: () => <Nav />,
        main: () => <Explore title="Explore" />,
        sidebar: () => <Sidebar />,
    },
    {
        path: '/notifications',
        nav: () => <Nav />,
        main: () => <Notifications title="Notifications" />,
        sidebar: () => <Sidebar />,
    },
    {
        path: '/bookmarks',
        nav: () => <Nav />,
        main: () => <Bookmarks title="Bookmarks" />,
        sidebar: () => <Sidebar />,
    },
    {
        path: '/messages',
        nav: () => <Nav />,
        main: () => <Messages title="Messages" />,
    },
    {
        path: '/lists',
        nav: () => <Nav />,
        main: () => <Lists title="Lists" />,
        sidebar: () => <Sidebar />,
    },
    {
        path: '/logout',
        exact: true,
        main: () => <Modal icon={<TwitterWhiteIcon />} />,
    },
    {
        path: '/:handle/status/:tweetId',
        exact: true,
        nav: () => <Nav />,
        main: () => <Status />,
        sidebar: () => <Sidebar />,
    },
    {
        path: '/:handle',
        nav: () => <Nav />,
        main: () => <Profile title="Profile" />,
        sidebar: () => <Sidebar />,
    },
];

const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <>
                <div className="container-1265">
                    <Switch>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} exact={route.exact || false}>
                                {route.nav}
                            </Route>
                        ))}
                        <Redirect to="/home" />
                    </Switch>
                    <div className="container-990">
                        <Switch>
                            {routes.map((route, index) => (
                                <Route key={index} path={route.path} exact={route.exact || false}>
                                    {route.main}
                                </Route>
                            ))}
                        </Switch>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route key={index} path={route.path} exact={route.exact || false}>
                                    {route.sidebar}
                                </Route>
                            ))}
                        </Switch>
                    </div>
                    <Switch>
                        <Route path="/compose/tweet" component={TweetCompose} />
                    </Switch>
                    <FooterNav />
                </div>
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
            <Route path="/:handle">
                <Profile />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};

export default useRoutes;
