import { useCallback, useState } from 'react';
import useHttp from './useHttp';

const useTweets = () => {
    const { request, loading } = useHttp();
    const [tweets, setTweets] = useState([]);
    const [tweet, setTweet] = useState({});
    const [replyingTweet, setReplyingTweet] = useState({});

    const fetchTweets = useCallback(
        async (userId, query) => {
            try {
                const response = await request(`/api/users/user/tweets?userId=${userId}&type=${query}`, 'GET');
                if (response.status === 200 && response.status !== 500) {
                    setTweets(response.tweets);
                }
            } catch (e) {}
        },
        [request],
    );

    const getTweet = useCallback(
        async (tweetId) => {
            try {
                const response = await request(`/api/tweets/tweet/${tweetId}`, 'GET');
                if (response && response.status === 200 && response.status !== 500) setTweet(response.tweet);
            } catch (e) {}
        },
        [request],
    );

    const destroy = useCallback(
        async (tweetId, cb) => {
            try {
                const response = await request(`/api/tweets/tweet/destroy/${tweetId}`, 'DELETE');
                if (response && response.status === 200 && response.status !== 500) {
                    cb((prev) => !prev);
                    setTweets((prev) => prev.filter((twt) => twt._id !== tweetId));
                }
            } catch (e) {}
        },
        [request, setTweets],
    );

    return {
        tweets,
        fetchTweets,
        setTweets,
        replyingTweet,
        setReplyingTweet,
        getTweet,
        tweet,
        setTweet,
        destroy,
        tweetsLoading: loading,
    };
};

export default useTweets;
