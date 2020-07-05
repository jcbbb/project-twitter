import React from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import Sidebar from '../sidebar/Sidebar';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './home.scss';

// TODO: Configure socket.io for messaging

const Home = ({ title }) => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{title ? `${title} / Twitter Doom` : 'Twitter Doom'}</title>
                </Helmet>
            </HelmetProvider>
            <Wall className="wall wall--320">
                <WallHeader>Home</WallHeader>
                <TweetTextarea />
                <div className="home">
                    <div className="divider"></div>
                </div>
            </Wall>
            <Sidebar />
        </>
    );
};

export default Home;
