import React from 'react';
import './app.scss';
import Header from './components/header/Header';
import Wall from './components/wall/Wall';
import SidebarLogin from './components/sidebarLogin/sidebarLogin';
import Signup from './components/signup/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className="wrapper">
                <Header />
                <main className="main">
                    <div className="container-990 flex">
                        <Wall />
                        <SidebarLogin />
                    </div>
                </main>
                <Route path="/signup">
                    <Signup />
                </Route>
            </div>
        </Router>
    );
};

export default App;
