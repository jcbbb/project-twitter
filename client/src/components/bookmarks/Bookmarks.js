import React, { useContext, useEffect, useCallback } from 'react';
import useHttp from '../../hooks/useHttp';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import Loader from '../loader/Loader';
import Tweet from '../tweet/Tweet';
import { UserContext } from '../../context/UserContext';
import { TweetsContext } from '../../context/TweetsContext';
import { ReactComponent as DotsIcon } from '../../assets/icons/dots.svg';

import './bookmarks.scss';

const Bookmarks = () => {
    const { currentUser } = useContext(UserContext);
    const { tweets, setTweets } = useContext(TweetsContext);
    const { request, loading } = useHttp();

    const getBookmarkedTweets = useCallback(async () => {
        try {
            if (!currentUser.bookmarks.length) return setTweets([]);
            const response = await request('/api/tweets/bookmarked', 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                setTweets(response.tweets);
            }
        } catch (e) {}
    }, [request, currentUser, setTweets]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            getBookmarkedTweets();
        }
        return () => (isSubscribed = false);
    }, [getBookmarkedTweets, currentUser.bookmarks]);

    return (
        <Wall>
            <WallHeader subheading={currentUser.handle} icon={<DotsIcon />} arrow={true} arrowHidden={true}>
                Bookmarks
            </WallHeader>
            <div className="bookmarks relative">
                {loading && <Loader />}
                {tweets.length > 0 &&
                    tweets.map((tweet, index) => (
                        <Tweet
                            key={index}
                            tweet={tweet}
                            idx={index}
                            hasActions={true}
                            hasMedia={true}
                            hasBorder={true}
                        />
                    ))}
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
