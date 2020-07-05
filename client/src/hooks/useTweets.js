import { useCallback, useState } from 'react';
import useHttp from './useHttp';

const useTweets = () => {
    const [tweets, setTweets] = useState([]);

    const { request, loading } = useHttp();
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

    return { tweets, fetchTweets, setTweets, tweetsLoading: loading };
};

export default useTweets;
