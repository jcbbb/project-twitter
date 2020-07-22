import React, { useContext, useState, useCallback } from 'react';
import Backdrop from '../backdrop/Backdrop';
import MenuItem from '../menuItem/MenuItem';
import { UserContext } from '../../context/UserContext';
import { TweetsContext } from '../../context/TweetsContext';
import useHttp from '../../hooks/useHttp';
import { formatNumber } from '../../helpers/formatNumber';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../../assets/icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { ReactComponent as HeartIconFilled } from '../../assets/icons/heart-filled.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import { ReactComponent as AddBookmarkIcon } from '../../assets/icons/bookmark-add.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/icons/external-link.svg';

import './tweetActions.scss';

const TweetActions = ({ tweet, size, idx, hasCount, ...props }) => {
    const [accordion, setAccordion] = useState({});
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { setReplyingTweet, reactOnTweet } = useContext(TweetsContext);
    const { request } = useHttp();
    const history = useHistory();
    const location = useLocation();

    const bookmark = useCallback(
        async (ev) => {
            ev.preventDefault();
            setAccordion({});
            try {
                const response = await request(`/api/tweets/tweet/bookmark/${tweet._id}`);
                if (response && response.status === 200 && response.status !== 500) {
                    if (currentUser.bookmarks.includes(response.tweetId)) {
                        return setCurrentUser((prev) => ({
                            ...prev,
                            bookmarks: prev.bookmarks.filter((bookmarkId) => bookmarkId !== response.tweetId),
                        }));
                    }

                    setCurrentUser((prev) => ({
                        ...prev,
                        bookmarks: [...prev.bookmarks, response.tweetId],
                    }));
                }
            } catch (e) {}
        },
        [request, currentUser, setCurrentUser, tweet._id],
    );

    return (
        <div className="tweet__actions" {...props}>
            <div
                className="tweet__actions-container"
                tabIndex="-1"
                onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    history.push({
                        pathname: '/compose/tweet',
                        state: { background: location },
                    });
                    setReplyingTweet(tweet);
                }}
            >
                <div className="tweet__actions-icon" tabIndex="0">
                    <span
                        className={`tweet__actions-icon-inner ${size && `tweet__actions-icon--${size}`}`}
                        tabIndex="-1"
                    >
                        <CommentIcon />
                    </span>
                </div>
                {hasCount && (
                    <span className="tweet__actions-count">
                        {tweet.reply_count > 0 && formatNumber(tweet.reply_count)}
                    </span>
                )}
            </div>
            <div className="tweet__actions-container" tabIndex="-1">
                <div className="tweet__actions-icon tweet__actions-icon--retweet" tabIndex="0">
                    <span
                        className={`tweet__actions-icon-inner ${
                            size && `tweet__actions-icon--${size}`
                        } tweet__actions-retweet`}
                        tabIndex="-1"
                    >
                        <RetweetIcon />
                    </span>
                </div>
                {hasCount && (
                    <span className="tweet__actions-count">
                        {tweet.retweet_count > 0 && formatNumber(tweet.retweet_count)}
                    </span>
                )}
            </div>
            <div className="tweet__actions-container" tabIndex="-1">
                <div
                    className={`tweet__actions-icon tweet__actions-icon--heart ${
                        tweet.liked && 'tweet__actions-icon--heart--liked'
                    }`}
                    tabIndex="0"
                    onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        reactOnTweet(idx, tweet);
                    }}
                >
                    <span
                        tabIndex="-1"
                        className={`tweet__actions-icon-inner ${size && `tweet__actions-icon--${size}`}`}
                    >
                        {tweet.liked ? <HeartIconFilled /> : <HeartIcon />}
                    </span>
                </div>
                {hasCount && (
                    <span className="tweet__actions-count">
                        {tweet.like_count > 0 && formatNumber(tweet.like_count)}
                    </span>
                )}
            </div>
            <div className="tweet__actions-container" tabIndex="-1">
                <div className="tweet__actions-icon" tabIndex="0">
                    <span
                        className={`tweet__actions-icon-inner ${size && `tweet__actions-icon--${size}`}`}
                        data-id="share"
                        tabIndex="-1"
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            setAccordion({ id: ev.target.dataset.id });
                        }}
                    >
                        <ShareIcon />
                    </span>
                </div>
                <span className="tweet__actions-count"></span>
                {accordion.id === 'share' && (
                    <Backdrop
                        noBg
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            setAccordion({});
                        }}
                    />
                )}
                <ul
                    tabIndex="-1"
                    className={`tweet__actions-menu ${accordion.id === 'share' && 'tweet__actions-menu--active'}`}
                >
                    <MenuItem icon={<AddBookmarkIcon />} onClick={bookmark}>
                        {currentUser.bookmarks.includes(tweet._id)
                            ? 'Remove Tweet from Bookmarks'
                            : 'Add Tweet to Bookmarks'}
                    </MenuItem>
                    <MenuItem icon={<ExternalLinkIcon />} data-id={tweet._id}>
                        Copy link to Tweet
                    </MenuItem>
                </ul>
            </div>
        </div>
    );
};

export default TweetActions;
