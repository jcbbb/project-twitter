import React, { useEffect, useState, useContext, useCallback } from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import Button from '../button/Button';
import Tweets from '../tweets/Tweets';
import useHttp from '../../hooks/useHttp';
import { TweetsContext } from '../../context/TweetsContext';
import { SocketContext } from '../../context/SocketContext';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FeatherIcon } from '../../assets/icons/feather.svg';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './home.scss';

const Home = ({ title }) => {
    const [viewport, setViewport] = useState(0);
    const { tweets, setTweets } = useContext(TweetsContext);
    const { socket } = useContext(SocketContext);
    const { request, loading } = useHttp();
    const resize = () => setViewport(window.innerWidth);
    const location = useLocation();

    const fetchFollowingTweets = useCallback(async () => {
        try {
            const response = await request('/api/tweets/following', 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                setTweets(response.tweets);
            }
        } catch (e) {}
    }, [request, setTweets]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            fetchFollowingTweets();
        }
        return () => (isSubscribed = false);
    }, [fetchFollowingTweets]);

    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            socket.on('new tweet', (data) => {
                setTweets((prev) => [...prev, data]);
            });
        }
    }, [socket, setTweets]);

    useEffect(() => {
        setViewport(window.innerWidth);
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{title ? `${title} / Twitter Doom` : 'Twitter Doom'}</title>
                </Helmet>
            </HelmetProvider>
            <Wall>
                <WallHeader profile={true}>Home</WallHeader>
                {viewport > 500 && <TweetTextarea />}
                <div className="home">{viewport > 500 && <div className="divider"></div>}</div>
                <div className="tweet-fixed-button">
                    <Link
                        to={{
                            pathname: '/compose/tweet',
                            state: { background: location },
                        }}
                    >
                        <Button
                            size="lg"
                            styleType="filled button__round button__round--lg"
                            icon={<FeatherIcon />}
                        ></Button>
                    </Link>
                </div>
                <Tweets tweets={tweets} loading={loading} />
            </Wall>
        </>
    );
};

export default Home;
