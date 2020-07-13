import React, { useState, useContext } from 'react';
import MenuItem from '../menuItem/MenuItem';
import useFollow from '../../hooks/useFollow';
import UserContext from '../../context/UserContext';
import TweetsContext from '../../context/TweetsContext';
import Modal from '../modal/Modal';
import Backdrop from '../backdrop/Backdrop';
import TweetActions from '../tweetActions/TweetActions';
import { Link } from 'react-router-dom';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as PinIcon } from '../../assets/icons/pin.svg';
import { ReactComponent as FollowIcon } from '../../assets/icons/follow.svg';
import { ReactComponent as UnfollowIcon } from '../../assets/icons/unfollow.svg';
import { compositeDecorator } from '../../helpers/decorators';

import './tweet.scss';

const convertToEditorState = (text) => {
    const content = convertFromRaw(JSON.parse(text));
    const editorState = EditorState.createWithContent(content, compositeDecorator);
    return editorState;
};

const Tweet = ({ tweet }) => {
    const [accordion, setAccordion] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { currentUser } = useContext(UserContext);
    const { setTweet, destroy } = useContext(TweetsContext);
    const { startFollowing } = useFollow();

    return (
        <div className="tweet-thread" tabIndex="-1">
            <div className="tweet" tabIndex="0">
                {isModalOpen && (
                    <Modal
                        heading="Delete Tweet?"
                        info="This can’t be undone and it will be removed from your profile, 
                          the timeline of any accounts that follow 
                          you, and from Twitter search results. "
                        primaryButtonText="Delete"
                        primaryButtonProps={{
                            styleType: 'danger',
                            size: 'md',
                            onClick: () => destroy(tweet._id, setIsModalOpen),
                        }}
                        buttonProps={{ onClick: () => setIsModalOpen((prev) => !prev) }}
                        backdropProps={{
                            onClick: (ev) => ev.target === ev.currentTarget && setIsModalOpen((prev) => !prev),
                        }}
                    />
                )}
                <Link
                    className="tweet__inner"
                    tabIndex="-1"
                    to={`/${tweet.user.handle}/status/${tweet._id}`}
                    onClick={() => setTweet(tweet)}
                >
                    <div className="tweet__left">
                        <div
                            className="tweeter__profile-image-container"
                            style={{ backgroundImage: `url(${tweet.user.profile_image_url})` }}
                        ></div>
                        <div className="tweet__line"></div>
                    </div>
                    <div className="tweet__content">
                        <div className="tweeter__info">
                            <h2 className="tweeter__info-name" tabIndex="0">
                                {tweet.user.name}
                            </h2>
                            <span className="tweeter__info-handle">{tweet.user.handle}</span>
                            <div data-id="chevron" className="tweet__dropdown-icon-container" tabIndex="0">
                                <span
                                    className="tweet__dropdown-icon"
                                    tabIndex="-1"
                                    data-id="chevron"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setAccordion({ id: ev.target.dataset.id });
                                    }}
                                >
                                    <ChevronIcon />
                                </span>
                                {accordion.id === 'chevron' && (
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
                                    className={`tweet__actions-menu ${
                                        accordion.id === 'chevron' && 'tweet__actions-menu--active'
                                    }`}
                                >
                                    {tweet.user._id === currentUser._id && (
                                        <>
                                            <MenuItem
                                                icon={<TrashIcon />}
                                                danger={true}
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    setIsModalOpen((prev) => !prev);
                                                    setAccordion({});
                                                }}
                                            >
                                                Delete
                                            </MenuItem>
                                            <MenuItem icon={<PinIcon />}>Pin to your profile</MenuItem>
                                        </>
                                    )}
                                    {!currentUser.following.includes(tweet.user._id) &&
                                    currentUser._id !== tweet.user._id ? (
                                        <MenuItem
                                            icon={<FollowIcon />}
                                            onClick={() => {
                                                startFollowing(tweet.user._id);
                                                setAccordion({});
                                            }}
                                        >
                                            Follow {tweet.user.handle}
                                        </MenuItem>
                                    ) : currentUser._id === tweet.user._id ? null : (
                                        <MenuItem
                                            icon={<UnfollowIcon />}
                                            onClick={() => {
                                                startFollowing(tweet.user._id);
                                                setAccordion({});
                                            }}
                                        >
                                            Unfollow {tweet.user.handle}
                                        </MenuItem>
                                    )}
                                </ul>
                            </div>
                        </div>
                        {tweet.text && (
                            <div className="tweeter__tweet">
                                <Editor editorState={convertToEditorState(tweet.text)} readOnly />
                            </div>
                        )}
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
                        <div style={{ maxWidth: '425px' }}>
                            <TweetActions tweet={tweet} />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Tweet;
