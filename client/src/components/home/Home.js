import React, { useEffect, useState } from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as FeatherIcon } from '../../assets/icons/feather.svg';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './home.scss';

const Home = ({ title }) => {
    const [viewport, setViewport] = useState(0);
    const resize = () => setViewport(window.innerWidth);

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
                    <Link to="/compose/tweet">
                        <Button
                            size="lg"
                            styleType="filled button__round button__round--lg"
                            icon={<FeatherIcon />}
                        ></Button>
                    </Link>
                </div>
            </Wall>
        </>
    );
};

export default Home;
