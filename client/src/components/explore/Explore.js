import React, { useEffect, useCallback, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import Tweets from '../tweets/Tweets';
import SearchInput from '../searchInput/SearchInput';
import Wall from '../wall/Wall';

import './explore.scss';

const Explore = () => {
    const { request } = useHttp();
    const [tweets, setTweets] = useState([]);
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
        </Wall>
    );
};

export default Explore;
