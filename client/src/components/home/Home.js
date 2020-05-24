import React from 'react';
import Nav from '../nav/Nav';
import Wall from '../wall/Wall';
import Sidebar from '../sidebar/Sidebar';
import Tweet from '../tweet/Tweet';
import MenuItem from '../menuItem/MenuItem';
import { Helmet } from 'react-helmet';
import './home.scss';

const Home = ({ title }) => (
    <>
        <Helmet>
            <title>{title ? `${title} / Twitter Doom` : 'Twitter Doom'}</title>
        </Helmet>
        <div className="flex home-container">
            <Nav />
            <div className="container-990 flex flex-justify-between">
                <Wall>
                    <Tweet />
                </Wall>
                <Sidebar />
            </div>
        </div>
        <MenuItem />
    </>
);

export default Home;
