import React, { useContext, useState, useCallback, useEffect } from 'react';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import TweetActions from '../tweetActions/TweetActions';
import MenuItem from '../menuItem/MenuItem';
import Backdrop from '../backdrop/Backdrop';
import useFollow from '../../hooks/useFollow';
import useHttp from '../../hooks/useHttp';
import Modal from '../modal/Modal';
import Tweets from '../tweets/Tweets';
import { TweetsContext } from '../../context/TweetsContext';
import { UserContext } from '../../context/UserContext';
import { format } from 'date-fns';
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import { compositeDecorator } from '../../helpers/decorators';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as PinIcon } from '../../assets/icons/pin.svg';
import { ReactComponent as FollowIcon } from '../../assets/icons/follow.svg';
import { ReactComponent as UnfollowIcon } from '../../assets/icons/unfollow.svg';

import './status.scss';

const convertToEditorState = (text) => {
    const content = convertFromRaw(JSON.parse(text));
    const editorState = EditorState.createWithContent(content, compositeDecorator);
    return editorState;
};

const Status = () => {
    const [accordion, setAccordion] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tweet, destroy, setTweets, tweets } = useContext(TweetsContext);
    const { currentUser } = useContext(UserContext);
    const { startFollowing } = useFollow();
    const { request, loading } = useHttp();

    const fetchReplies = useCallback(async () => {
        try {
            const response = await request(`/api/tweets/tweet/${tweet._id}/replies`, 'GET');
            if (response && response.status === 200 && response.status !== 500) {
                setTweets(response.replies);
            }
        } catch (e) {}
    }, [setTweets, request, tweet._id]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) fetchReplies();
        return () => (isSubscribed = false);
    }, [fetchReplies]);

    return (
        <Wall>
            <WallHeader arrow>Tweet</WallHeader>
            <div className="status">
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
                <div className="status__header">
                    <div className="status__header-left">
                        <div
                            className="status__header-profile-image"
                            style={{ backgroundImage: `url(${tweet.user.profile_image_url})` }}
                        ></div>
                        <div className="nav__profile-info">
                            <div className="nav__profile-name-container">
                                <span className="nav__profile-name">{tweet.user.name}</span>
                            </div>
                            <div className="nav__profile-handle-container">
                                <span className="nav__profile-handle">{tweet.user.handle}</span>
                            </div>
                        </div>
                    </div>
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
                            {!currentUser.following.includes(tweet.user._id) && currentUser._id !== tweet.user._id ? (
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
                    <div className="status__content">
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
                <div className="status__date">
                    <span>{format(new Date(tweet.createdAt), 'hh:mm a')}</span>
                    <span className="status__date-middle-dot">&#183;</span>
                    <span>{format(new Date(tweet.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                {(tweet.reply_count > 0 || tweet.retweet_count > 0 || tweet.like_count > 0) && (
                    <div className="status__metrics">
                        {(tweet.reply_count > 0 || tweet.retweet_count > 0) && (
                            <div className="status__metric">
                                <span className="status__metric-count">
                                    {tweet.reply_count > 0
                                        ? tweet.reply_count
                                        : tweet.retweet_count > 0
                                        ? tweet.retweet_count
                                        : tweet.reply_count + tweet.retweet_count}
                                </span>
                                <a className="status__metric-link">
                                    <span className="status__metric-text">
                                        {tweet.reply_count === 1
                                            ? 'Comment'
                                            : tweet.retweet_count === 1
                                            ? 'Retweet'
                                            : tweet.reply_count > 1
                                            ? 'Comments'
                                            : tweet.retweet_count > 1
                                            ? 'Retweets'
                                            : 'Comments and retweets '}
                                    </span>
                                </a>
                            </div>
                        )}
                        {tweet.like_count > 0 && (
                            <div className="status__metric">
                                <span className="status__metric-count">{tweet.like_count}</span>
                                <a className="status__metric-link">
                                    <span className="status__metric-text">
                                        {tweet.like_count === 1 ? 'Like' : 'Likes'}
                                    </span>
                                </a>
                            </div>
                        )}
                    </div>
                )}
                <TweetActions size="lg" tweet={tweet} style={{ justifyContent: 'space-around' }} />
            </div>
            {tweets.length > 0 && <span className="border-bottom"></span>}
            <Tweets loading={loading} tweets={tweets} />
        </Wall>
    );
};

export default Status;
