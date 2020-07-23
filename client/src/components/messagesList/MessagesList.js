import React, { useState, useEffect, useContext } from 'react';
import Button from '../button/Button';
import { formatName } from '../../helpers/formatName';
import { MessagesContext } from '../../context/MessagesContext';
import { UserContext } from '../../context/UserContext';
import { ReactComponent as ComposeMessageIcon } from '../../assets/icons/compose-message.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { NavLink, Link, useParams, useLocation } from 'react-router-dom';

import './messagesList.scss';

const MessagesList = () => {
    const params = useParams();
    const location = useLocation();
    const [value, setValue] = useState(null);
    const { threads, getThreads } = useContext(MessagesContext);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) getThreads();
        return () => (isSubscribed = false);
    }, [params.threadId]);

    return (
        <div className="messages__list">
            <div className="messages__list-header">
                <h2 className="messages__list-header-heading">Messages</h2>
                <Link
                    to={{
                        pathname: '/messages/compose',
                        state: { messagesBackground: location },
                    }}
                    className="messages__list-header-icon"
                    tabIndex="0"
                >
                    <span className="messages__list-header-icon-inner" tabIndex="-1">
                        <ComposeMessageIcon />
                    </span>
                </Link>
            </div>
            <div className="messages__list-searchbar">
                <div className="search-group search-group--lg">
                    <input
                        type="text"
                        placeholder="Search for people or groups"
                        value={value || ''}
                        className="search-group__input"
                        onChange={({ target }) => setValue(target.value)}
                    />
                    <span className="search-group__icon-search">
                        <SearchIcon />
                    </span>
                </div>
            </div>
            <ul className="messages__list-items">
                {threads.map((thread, index) => (
                    <li
                        className={`messages__list-item ${
                            params.threadId === thread._id && 'messages__list-item--active'
                        }`}
                        tabIndex="0"
                        key={index}
                    >
                        <NavLink
                            exact
                            to={`/messages/${thread._id}`}
                            activeClassName="messages__list-item--active"
                            className="messages__list-item-inner"
                            tabIndex="-1"
                        >
                            <div className="messages__list-item-image">
                                {thread.participants.map((participant, key) => (
                                    <>
                                        {currentUser._id !== participant._id && (
                                            <img key={key} src={participant.profile_image_url} />
                                        )}
                                    </>
                                ))}
                            </div>
                            <div className="messages__list-item-info">
                                <div className="messages__list-user">
                                    <span className="messages__list-user-name">
                                        {formatName(thread.participants, currentUser)}
                                    </span>
                                    {thread.participants.length < 2 && (
                                        <span className="messages__list-user-handle">
                                            {thread.participants[0].handle}
                                        </span>
                                    )}
                                </div>
                                <div className="messages__list-user-last-message">
                                    <span className="messages__list-user-last-message-text">
                                        {thread.last_message && thread.last_message.message_text}
                                    </span>
                                </div>
                            </div>
                            <span className="messages__list-item-date">Apr 30</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="tweet-fixed-button">
                <Link
                    to={{
                        pathname: '/messages/compose',
                        state: { messagesBackground: location },
                    }}
                >
                    <Button
                        size="lg"
                        styleType="filled button__round button__round--lg"
                        icon={<ComposeMessageIcon />}
                    ></Button>
                </Link>
            </div>
        </div>
    );
};

export default MessagesList;
