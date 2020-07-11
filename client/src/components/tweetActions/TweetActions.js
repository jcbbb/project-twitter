import React, { useContext, useState, useCallback } from 'react';
import Backdrop from '../backdrop/Backdrop';
import MenuItem from '../menuItem/MenuItem';
import UserContext from '../../context/UserContext';
import TweetsContext from '../../context/TweetsContext';
import useHttp from '../../hooks/useHttp';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../../assets/icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { ReactComponent as HeartIconFilled } from '../../assets/icons/heart-filled.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import { ReactComponent as AddBookmarkIcon } from '../../assets/icons/bookmark-add.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/icons/external-link.svg';

import './tweetActions.scss';

const TweetActions = ({ tweet, size, ...props }) => {
    const [accordion, setAccordion] = useState({});
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { setReplyingTweetId, setTweets } = useContext(TweetsContext);
    const { request } = useHttp();
    const history = useHistory();

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
        [request, currentUser, setCurrentUser],
    );
    const reactOnTweet = useCallback(
        async (tweet) => {
            try {
                const response = await request(`/api/tweets/tweet/react/${tweet._id}`, 'POST', {
                    reaction: !tweet.liked ? 'Like' : 'Dislike',
                });
            } catch (e) {}
        },
        [request],
    );
    return (
        <div className="tweet__actions" {...props}>
            <div
                className="tweet__actions-container"
                tabIndex="0"
                onClick={() => {
                    history.push('/compose/tweet');
                    setReplyingTweetId(tweet._id);
                }}
            >
                <span
                    className={`tweet__actions-icon ${size && `tweet__actions-icon--${size}`} tweet__actions-comment`}
                    tabIndex="-1"
                >
                    <CommentIcon />
                </span>
                <span className="tweet__actions-count">{tweet.reply_count > 0 && tweet.reply_count}</span>
            </div>
            <div className="tweet__actions-container tweet__actions-container--retweet" tabIndex="0">
                <span
                    className={`tweet__actions-icon ${size && `tweet__actions-icon--${size}`} tweet__actions-retweet`}
                    tabIndex="-1"
                >
                    <RetweetIcon />
                </span>
                <span className="tweet__actions-count">{tweet.retweet_count > 0 && tweet.retweet_count}</span>
            </div>
            <div className="tweet__actions-container tweet__actions-container--heart" tabIndex="0">
                <span
                    className={`tweet__actions-icon ${size && `tweet__actions-icon--${size}`} tweet__actions-heart`}
                    tabIndex="-1"
                    onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        reactOnTweet(tweet);
                    }}
                >
                    {tweet.liked ? <HeartIconFilled /> : <HeartIcon />}
                </span>
                <span className="tweet__actions-count">{tweet.like_count > 0 && tweet.like_count}</span>
            </div>
            <div className="tweet__actions-container" tabIndex="0">
                <span
                    className={`tweet__actions-icon ${size && `tweet__actions-icon--${size}`} tweet__actions-share`}
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
