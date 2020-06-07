import { useState, useCallback, useEffect } from 'react';
import useHttp from '../hooks/useHttp';

const useUser = () => {
    const [user, setUser] = useState({
        userId: null,
        name: null,
        handle: null,
        location: null,
        website: null,
        bio: null,
        joined: null,
        followers: [],
        following: [],
        profileImageUrl: null,
        bannerImageUrl: null,
    });

    const [tweets, setTweets] = useState([]);
    const [tweetUser, setTweetUser] = useState({});

    const { request, loading } = useHttp();

    const getUser = useCallback(async () => {
        try {
            const response = await request('/api/users/user/profile', 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                return setUser(response.user);
            }
            setUser((prev) => ({ ...prev }));
        } catch (e) {}
    }, [request, setUser]);

    const fetchTweets = useCallback(async () => {
        try {
            const response = await request('/api/users/user/tweets', 'GET');
            if (response.status === 200 && response.status !== 500) {
                setTweets(response.tweets);
                setTweetUser(response.user);
            }
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            getUser();
        }
        return () => (isSubscribed = false);
    }, [getUser]);

    return { getUser, user, fetchTweets, tweets, tweetUser, tweetsLoading: loading };
};

export default useUser;
