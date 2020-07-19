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

    const reactOnTweet = useCallback(
        async (idx, tweet) => {
            try {
                const response = await request(`/api/tweets/tweet/react/${tweet._id}`, 'POST', {
                    reaction: !tweet.liked ? 'Like' : 'Dislike',
                });
                if(response && response.status === 200 && response.status !== 500) {
                    const tweetsArr = [...tweets];
                    tweetsArr[idx].liked = !tweetsArr[idx].liked
                    tweetsArr[idx].like_count = !tweet.liked ? tweets[idx].like_count - 1 : tweets[idx].like_count + 1;
                    setTweets(tweetsArr);
                }
            } catch (e) {}
        },
        [request, tweets],
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
        reactOnTweet,
        tweetsLoading: loading,
    };
};

export default useTweets;
