import React, {useContext} from 'react';
import Tweet from '../tweet/Tweet';
import Loader from '../loader/Loader';
import TweetsContext from '../../context/TweetsContext';

const Tweets = () => {
    const { tweets } = useContext(TweetsContext)
    return (
        <div className="relative">
            {tweets.map((tweet, index) => (
                <Tweet key={index} tweet={tweet} idx={index} hasActions={true} hasMedia={true} hasBorder={true} />
            ))}
        </div>
    );
};
export default Tweets;
