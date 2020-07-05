import { createContext } from 'react';

const TweetsContext = createContext({
    tweets: [],
    fetchTweets: () => {},
    setTweets: () => {},
});

export default TweetsContext;
