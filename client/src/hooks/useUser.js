import { useState, useCallback, useEffect } from 'react';
import useHttp from '../hooks/useHttp';

const useUser = () => {
    const [currentUser, setCurrentUser] = useState({
        userId: null,
        name: '',
        handle: '',
        location: '',
        website: '',
        bio: '',
        joined: null,
        followers: [],
        following: [],
        profileImageUrl: null,
        bannerImageUrl: null,
    });

    const [tweets, setTweets] = useState([]);

    const { request, loading } = useHttp();

    const getCurrentUser = useCallback(async () => {
        try {
            const response = await request('/api/users/user/profile', 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                return setCurrentUser(response.user);
            }
            setCurrentUser((prev) => ({ ...prev }));
        } catch (e) {}
    }, [request, setCurrentUser]);

    const fetchTweets = useCallback(
        async (handle) => {
            try {
                const response = await request(`/api/users/user/tweets?handle=${handle}`, 'GET');
                if (response.status === 200 && response.status !== 500) {
                    setTweets(response.tweets);
                }
            } catch (e) {}
        },
        [request],
    );

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            getCurrentUser();
        }
        return () => (isSubscribed = false);
    }, [getCurrentUser]);

    return {
        getCurrentUser,
        currentUser,
        fetchTweets,
        tweets,
        setCurrentUser,
        tweetsLoading: loading,
    };
};

export default useUser;
