import { createContext } from 'react';

const TweetsContext = createContext({
    tweets: [],
    fetchTweets: () => {},
    setTweets: () => {},
    setTweet: () => {},
    getTweet: () => {},
    replyingTweetId: '',
});

export default TweetsContext;
