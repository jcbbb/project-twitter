import React from 'react';
import WallHeader from '../wallHeader/WallHeader';
import TweetTextarea from '../tweetTextarea/TweetTextarea';
import './wall.scss';

const Wall = ({ children }) => {
    return (
        <div className="wall">
            <WallHeader>Home</WallHeader>
            <TweetTextarea />
            {children}
        </div>
    );
};

export default Wall;
