import React from 'react';
import Tweet from '../tweet/Tweet';
import Loader from '../loader/Loader';
import { convertFromRaw } from 'draft-js';

const Tweets = ({ tweets, tweetUser, loading }) => {
    return (
        <div className="relative">
            {loading && <Loader />}
            {tweets.map((tweet, index) => (
                <Tweet key={index} tweet={JSON.parse(convertFromRaw(tweet))} tweetUser={tweetUser} />
            ))}
        </div>
    );
};
export default Tweets;
