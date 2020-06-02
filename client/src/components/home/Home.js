import React from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import Sidebar from '../sidebar/Sidebar';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './home.scss';

const Home = ({ title }) => (
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

export default Home;
