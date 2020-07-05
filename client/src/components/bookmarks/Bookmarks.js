import React, { useContext, useEffect, useCallback, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import Loader from '../loader/Loader';
import Tweets from '../tweets/Tweets';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';
import UserContext from '../../context/UserContext';

import './bookmarks.scss';

const Bookmarks = () => {
    const { currentUser } = useContext(UserContext);
    const [tweets, setTweets] = useState([]);
    const { request, loading } = useHttp();

    const getBookmarkedTweets = useCallback(async () => {
        try {
            const response = await request('/api/tweets/bookmarked', 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                setTweets(response.tweets);
            }
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            getBookmarkedTweets();
        }
        return () => (isSubscribed = false);
    }, [getBookmarkedTweets, currentUser]);

    return (
        <Wall className="wall wall--320">
            <WallHeader subheading={currentUser.handle} icon={<DotsIcon />}>
                Bookmarks
            </WallHeader>
            <div className="bookmarks relative">
                {loading && <Loader />}
                <Tweets tweets={tweets} />
                {!tweets.length && (
                    <div className="no-bookmarks">
                        <h2>You haven't added any Tweets to you Bookmarks yet</h2>
                        <p>When you do, they'll show up here.</p>
                    </div>
                )}
            </div>
        </Wall>
    );
};

export default Bookmarks;
