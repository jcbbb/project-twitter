import React from 'react';
import './app.scss';
import Header from './components/header/Header';
import Wall from './components/wall/Wall';
import SidebarLogin from './components/sidebarLogin/sidebarLogin';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/nav/Nav';

const App = () => {
    return (
        <Router>
            <div className="wrapper">
                <Route path="/">
                    <Header />
                    <main className="main">
                        <div className="container-990 flex">
                            <Wall />
                            <SidebarLogin />
                        </div>
                    </main>
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </div>
        </Router>
    );
};

export default App;
