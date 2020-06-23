import React, { useState, useCallback, useContext } from 'react';
import MenuItem from '../menuItem/MenuItem';
import useHttp from '../../hooks/useHttp';
import UserContext from '../../context/UserContext';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../../assets/icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import { ReactComponent as AddBookmarkIcon } from '../../assets/icons/bookmark-add.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as PinIcon } from '../../assets/icons/pin.svg';
import { ReactComponent as FollowIcon } from '../../assets/icons/follow.svg';
import { ReactComponent as UnfollowIcon } from '../../assets/icons/unfollow.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/icons/external-link.svg';
import { compositeDecorator } from '../../helpers/decorators';

import './tweet.scss';

const convertToEditorState = (text) => {
    const content = convertFromRaw(JSON.parse(text));
    const editorState = EditorState.createWithContent(content, compositeDecorator);
    return editorState;
};

const Tweet = ({ tweet }) => {
    const [accordion, setAccordion] = useState({});
    const { setCurrentUser, currentUser } = useContext(UserContext);
    const { request } = useHttp();

    const bookmark = useCallback(
        async (e) => {
            e.preventDefault();
            const { id } = e.target.parentNode.dataset;
            try {
                const response = await request(`/api/tweets/tweet/bookmark?tweetId=${id}`);
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
    return (
        <div className="tweet" tabIndex="0">
            <div
                className="tweeter__profile-image-container"
                style={{ backgroundImage: `url(${tweet.user.profile_image_url})` }}
            ></div>
            <div className="tweet__content">
                <div className="tweeter__info">
                    <h2 className="tweeter__info-name" tabIndex="0">
                        {tweet.user.name}
                    </h2>
                    <span className="tweeter__info-handle">{tweet.user.handle}</span>
                    <div
                        data-id="chevron"
                        className="tweet__dropdown-icon"
                        tabIndex="0"
                        onClick={({ target }) => {
                            setAccordion({ id: target.dataset.id });
                        }}
                    >
                        <ChevronIcon />
                        <div
                            className={`tweet__actions-backdrop ${
                                accordion.id === 'chevron' && 'tweet__actions-backdrop--active'
                            }`}
                            onClick={() => setAccordion({})}
                        ></div>
                        <ul
                            className={`tweet__actions-menu ${
                                accordion.id === 'chevron' && 'tweet__actions-menu--active'
                            }`}
                        >
                            <MenuItem icon={<TrashIcon />} danger={true} data-id={tweet._id}>
                                Delete
                            </MenuItem>
                            <MenuItem icon={<PinIcon />} data-id={tweet._id}>
                                Pin to your profile
                            </MenuItem>
                            <MenuItem icon={<FollowIcon />} data-id={tweet._id}>
                                Follow {tweet.user.handle}
                            </MenuItem>
                            <MenuItem icon={<UnfollowIcon />} data-id={tweet._id}>
                                Unfollow {tweet.user.handle}
                            </MenuItem>
                        </ul>
                    </div>
                </div>
                <div className="tweeter__tweet">
                    <Editor editorState={convertToEditorState(tweet.text)} readOnly />
                </div>
                {tweet.media.urls.length > 0 && (
                    <div className="tweet-textarea__image-preview-container" style={{ marginTop: '20px' }}>
                        {tweet.media.urls.map((url, index) => (
                            <div
                                key={index}
                                className="tweet-textarea__image-preview"
                                style={{
                                    backgroundImage: `url(${url})`,
                                    gridRow: index === 1 && tweet.media.urls.length === 3 && 'span 2',
                                }}
                            ></div>
                        ))}
                    </div>
                )}
                <div className="tweet__actions">
                    <div className="tweet__actions-container">
                        <span className="tweet__actions-icon tweet__actions-comment" tabIndex="0">
                            <CommentIcon />
                        </span>
                        <span className="tweet__actions-count">{tweet.reply_count}</span>
                    </div>
                    <div className="tweet__actions-container">
                        <span className="tweet__actions-icon tweet__actions-retweet" tabIndex="0">
                            <RetweetIcon />
                        </span>
                        <span className="tweet__actions-count">{tweet.retweet_count}</span>
                    </div>
                    <div className="tweet__actions-container">
                        <span className="tweet__actions-icon tweet__actions-heart" tabIndex="0">
                            <HeartIcon />
                        </span>
                        <span className="tweet__actions-count">{tweet.like_count}</span>
                    </div>
                    <div className="tweet__actions-container">
                        <span
                            className="tweet__actions-icon tweet__actions-share"
                            data-id="share"
                            tabIndex="0"
                            onClick={({ target }) => {
                                setAccordion({ id: target.dataset.id });
                            }}
                        >
                            <ShareIcon />
                        </span>
                        <span className="tweet__actions-count"></span>
                        <div
                            className={`tweet__actions-backdrop ${
                                accordion.id === 'share' && 'tweet__actions-backdrop--active'
                            }`}
                            onClick={() => setAccordion({})}
                        ></div>
                        <ul
                            className={`tweet__actions-menu ${
                                accordion.id === 'share' && 'tweet__actions-menu--active'
                            }`}
                        >
                            <MenuItem icon={<AddBookmarkIcon />} data-id={tweet._id} onClick={bookmark}>
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
            </div>
        </div>
    );
};

export default Tweet;
