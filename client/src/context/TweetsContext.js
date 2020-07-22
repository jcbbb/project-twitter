import React, { createContext } from 'react';
import useTweets from '../hooks/useTweets';

export const TweetsContext = createContext({});

const TweetsContextProvider = ({ children }) => {
    const {
        tweets,
        tweetsLoading,
        setTweets,
        fetchTweets,
        replyingTweet,
        tweet,
        setTweet,
        getTweet,
        destroy,
        reactOnTweet,
        setReplyingTweet,
    } = useTweets();

    return (
        <TweetsContext.Provider
            value={{
                tweets,
                tweetsLoading,
                setTweets,
                fetchTweets,
                replyingTweet,
                tweet,
                setTweet,
                getTweet,
                destroy,
                reactOnTweet,
                setReplyingTweet,
            }}
        >
            {children}
        </TweetsContext.Provider>
    );
};
export default TweetsContextProvider;
