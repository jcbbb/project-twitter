import React, { useState, useContext, useEffect } from 'react';
import Navlink from '../navlink/Navlink';
import Button from '../button/Button';
import MenuItem from '../../components/menuItem/MenuItem';
import UserContext from '../../context/UserContext';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { ReactComponent as MessageIcon } from '../../assets/icons/message.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/icons/bookmark.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/more.svg';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import { ReactComponent as ListsIcon } from '../../assets/icons/lists.svg';
import { ReactComponent as HashtagIcon } from '../../assets/icons/hashtag.svg';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as CheckmarkIcon } from '../../assets/icons/checkmark.svg';

import './nav.scss';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, getCurrentUser } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        if (isSubscribed) {
            getCurrentUser();
        }
        return () => (isSubscribed = false);
    }, [getCurrentUser]);

    return (
        <>
            <nav className="nav">
                <div className="nav__container">
                    <span className="nav__icon">
                        <TwitterWhiteIcon />
                    </span>
                    <Navlink to="/home" icon={<HomeIcon />}>
                        Home
                    </Navlink>
                    <Navlink to="/explore" icon={<HashtagIcon />}>
                        Explore
                    </Navlink>
                    <Navlink to="/notifications" icon={<NotificationIcon />}>
                        Notifications
                    </Navlink>
                    <Navlink to="/messages" icon={<MessageIcon />}>
                        Messages
                    </Navlink>
                    <Navlink to="/bookmarks" icon={<BookmarkIcon />}>
                        Bookmarks
                    </Navlink>
                    <Navlink to="/lists" icon={<ListsIcon />}>
                        Lists
                    </Navlink>
                    <Navlink to={`/${currentUser.handle}`} icon={<ProfileIcon />}>
                        Profile
                    </Navlink>
                    <Navlink to="/more" icon={<MoreIcon />}>
                        More
                    </Navlink>
                    <Button className="button__filled nav__tweet-btn" style={{ padding: '14px', width: '90%' }}>
                        Tweet
                    </Button>
                    <div className="nav__profile" tabIndex="0" onClick={() => setIsOpen((o) => !o)}>
                        <div
                            className="nav__profile-image"
                            style={{ backgroundImage: `url(${currentUser.profileImageUrl})` }}
                        ></div>
                        <div className="nav__profile-info">
                            <div className="nav__profile-name-container">
                                <span className="nav__profile-name">{currentUser.name}</span>
                            </div>
                            <div className="nav__profile-handle-container">
                                <span className="nav__profile-handle">{currentUser.handle}</span>
                            </div>
                        </div>
                        <span className="nav__profile-icon">
                            <ChevronIcon />
                        </span>
                        {isOpen && (
                            <div className="nav__menu">
                                <div className="nav__menu-header">
                                    <div
                                        className="nav__profile-image"
                                        style={{
                                            backgroundImage: `url(${currentUser.profileImageUrl})`,
                                        }}
                                    ></div>
                                    <div className="nav__profile-info">
                                        <div className="nav__profile-name-container">
                                            <span className="nav__profile-name">{currentUser.name}</span>
                                        </div>
                                        <div className="nav__profile-handle-container">
                                            <span className="nav__profile-handle">{currentUser.handle}</span>
                                        </div>
                                    </div>
                                    <span className="nav__menu-icon">
                                        <CheckmarkIcon />
                                    </span>
                                </div>
                                <MenuItem exact to="/logout">
                                    Log out {currentUser.handle}
                                </MenuItem>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
