import React, { useEffect } from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import Sidebar from '../sidebar/Sidebar';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import io from 'socket.io-client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './home.scss';

//const ENDPOINT = 'localhost:5000';

const Home = ({ title }) => {
    //useEffect(() => {
    //    const socket = io(ENDPOINT);
    //}, [ENDPOINT]);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{title ? `${title} / Twitter Doom` : 'Twitter Doom'}</title>
                </Helmet>
            </HelmetProvider>
            <>
                <Wall className="wall wall--320">
                    <WallHeader>Home</WallHeader>
                    <TweetTextarea />
                </Wall>
                <Sidebar />
            </>
        </>
    );
};

export default Home;
