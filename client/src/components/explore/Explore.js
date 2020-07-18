import React, { useEffect, useCallback, useContext } from 'react';
import useHttp from '../../hooks/useHttp';
import Tweets from '../tweets/Tweets';
import SearchInput from '../searchInput/SearchInput';
import Wall from '../wall/Wall';
import TweetsContext from '../../context/TweetsContext';
import Button from '../button/Button';
import { ReactComponent as FeatherIcon } from '../../assets/icons/feather.svg';
import { Link, useLocation } from 'react-router-dom';

import './explore.scss';

const Explore = () => {
    const { request } = useHttp();
    const { tweets, setTweets } = useContext(TweetsContext);
    const location = useLocation();

    const fetchAllTweets = useCallback(async () => {
        try {
            const response = await request('/api/tweets/all', 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                setTweets(response.tweets);
            }
        } catch (e) {}
    }, [request, setTweets]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) fetchAllTweets();
        return () => (isSubscribed = false);
    }, [fetchAllTweets]);

    return (
        <Wall>
            <div className="explore">
                <div className="explore__header">
                    <SearchInput />
                </div>
                <Tweets tweets={tweets} />
            </div>
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
        </Wall>
    );
};

export default Explore;
