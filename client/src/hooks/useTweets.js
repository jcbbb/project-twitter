import { useCallback, useState } from 'react';
import useHttp from './useHttp';

const useTweets = () => {
    const { request, loading } = useHttp();
    const [tweets, setTweets] = useState([]);
    const [tweet, setTweet] = useState({});
    const [replyingTweetId, setReplyingTweetId] = useState('');

    const fetchTweets = useCallback(
        async (userId) => {
            try {
                const response = await request(`/api/users/user/tweets?userId=${userId}`, 'GET');
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
        replyingTweetId,
        setReplyingTweetId,
        getTweet,
        tweet,
        setTweet,
        destroy,
        tweetsLoading: loading,
    };
};

export default useTweets;
