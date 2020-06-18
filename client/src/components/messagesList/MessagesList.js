import React, { useState } from 'react';
import { ReactComponent as ComposeMessageIcon } from '../../assets/icons/compose-message.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { NavLink, Link } from 'react-router-dom';
import './messagesList.scss';

const MessagesList = () => {
    const [value, setValue] = useState(null);
    return (
        <div className="messages__list">
            <div className="messages__list-header">
                <h2 className="messages__list-header-heading">Messages</h2>
                <Link to="/messages/compose">
                    <span className="messages__list-header-icon">
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
                    <span className="search-group__icon">
                        <SearchIcon />
                    </span>
                </div>
            </div>
            <ul className="messages__list-items">
                <NavLink to={'/messages/454545'}>
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
                </NavLink>
            </ul>
        </div>
    );
};

export default MessagesList;
