import React from 'react';
import Nav from '../nav/Nav';
import Wall from '../wall/Wall';
import Sidebar from '../sidebar/Sidebar';
import './home.scss';

const Home = () => (
    <div className="flex home-container">
        <Nav />
        <div className="container-990 flex flex-justify-between">
            <Wall />
            <Sidebar />
        </div>
    </div>
);

export default Home;
