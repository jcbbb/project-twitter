import React, { useState } from 'react';
import Button from '../button/Button';
import MessagesCompose from '../messagesCompose/MessagesCompose';
import { Link, useRouteMatch, Route, Switch } from 'react-router-dom';
import { ReactComponent as ComposeMessage } from '../../assets/icons/compose-message.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import './messages.scss';

const Messages = () => {
    const [value, setValue] = useState(null);
    const match = useRouteMatch();
    return (
        <>
            <div className="messages">
                <div className="messages__list">
                    <div className="messages__list-header">
                        <h2 className="messages__list-header-heading">Messages</h2>
                        <Link exact to={`${match.url}/compose`}>
                            <span className="messages__list-header-icon">
                                <ComposeMessage />
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
                            <span className="search-group__icon">
                                <SearchIcon />
                            </span>
                        </div>
                    </div>
                    <ul className="messages__list-items">
                        <li className="messages__list-item">
                            <div className="messages__list-item-image"></div>
                            <div className="messages__list-item-info">
                                <div className="messages__list-user">
                                    <span className="messages__list-user-name">Gary Simon</span>
                                    <span className="messages__list-user-handle">@designcoursecom</span>
                                </div>
                                <div className="messages__list-user-last-message">
                                    <span className="messages__list-user-last-message-text">
                                        We are sorry you are having some technical issues
                                    </span>
                                </div>
                            </div>
                            <span className="messages__list-item-date">Apr 30</span>
                        </li>
                    </ul>
                </div>
                <div className="messages__chat">
                    <div className="messages__chat-container">
                        <div className="messages__new-message">
                            <h2 className="messages__new-message-heading">You don't have a message selected</h2>
                            <p className="messages__new-message-sub">
                                Choose one from your existing messages, or start a new one
                            </p>
                            <Button className="button__filled messages__new-message-btn">New message</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Switch>
                <Route exact path={`${match.path}/compose`}>
                    <MessagesCompose />
                </Route>
            </Switch>
        </>
    );
};

export default Messages;
