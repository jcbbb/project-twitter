import React from 'react';
import SamsungLogo from '../../assets/images/samsung-logo.png';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../../assets/icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';

import './tweet.scss';

const Tweet = () => (
    <div className="tweet" tabIndex="0">
        <div className="tweeter__profile-image-container">
            <img src={SamsungLogo} alt="SamsungLogo" />
        </div>
        <div className="tweet__content">
            <div className="tweeter__info">
                <h2 className="tweeter__info-name" tabIndex="0">
                    WebDesignDev
                </h2>
                <span className="tweeter__info-handle">@WedDesignDev</span>
                <span className="tweet__dropdown-icon" tabIndex="0">
                    <ChevronIcon />
                </span>
            </div>
            <div className="tweeter__tweet">
                <p>20 Food Apps UI Designs and Resources for Your Inspiration</p>
            </div>
            <div className="tweet__actions">
                <div className="tweet__actions-container">
                    <span className="tweet__actions-icon tweet__actions-comment" tabIndex="0">
                        <CommentIcon />
                    </span>
                    <span className="tweet__actions-count">14</span>
                </div>
                <div className="tweet__actions-container">
                    <span className="tweet__actions-icon tweet__actions-retweet" tabIndex="0">
                        <RetweetIcon />
                    </span>
                    <span className="tweet__actions-count">45</span>
                </div>
                <div className="tweet__actions-container">
                    <span className="tweet__actions-icon tweet__actions-heart" tabIndex="0">
                        <HeartIcon />
                    </span>
                    <span className="tweet__actions-count">12</span>
                </div>
                <div className="tweet__actions-container">
                    <span className="tweet__actions-icon tweet__actions-share" tabIndex="0">
                        <ShareIcon />
                    </span>
                    <span className="tweet__actions-count">32</span>
                </div>
            </div>
        </div>
    </div>
);

export default Tweet;
