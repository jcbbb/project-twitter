import { createContext } from 'react';

const TweetsContext = createContext({
    tweets: [],
    fetchTweets: () => {},
    setTweets: () => {},
    setTweet: () => {},
    getTweet: () => {},
    replyingTweet: {},
    setReplyingTweet: () => {},
});

export default TweetsContext;
