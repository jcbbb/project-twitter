import React, { useState, useContext, useEffect } from 'react';
import Navlink from '../navlink/Navlink';
import Button from '../button/Button';
import MenuItem from '../../components/menuItem/MenuItem';
import useHttp from '../../hooks/useHttp';
import UserContext from '../../context/UserContext';
import Loader from '../loader/Loader';
import Backdrop from '../backdrop/Backdrop';
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
    const { loading } = useHttp();
    const { user, getUser } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        if (isSubscribed) {
            getUser();
        }
        return () => (isSubscribed = false);
    }, [getUser]);

    return (
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
                <Navlink to="/profile" icon={<ProfileIcon />}>
                    Profile
                </Navlink>
                <Navlink to="/more" icon={<MoreIcon />}>
                    More
                </Navlink>
                <Button
                    className="button__filled nav__tweet-btn"
                    style={{ padding: '14px', width: '90%' }}
                >
                    Tweet
                </Button>
                {loading ? (
                    <Backdrop>
                        <Loader />
                    </Backdrop>
                ) : (
                    <div className="nav__profile" tabIndex="0" onClick={() => setIsOpen((o) => !o)}>
                        <div className="nav__profile-image">
                            <img src={user.profileImageUrl} />
                        </div>
                        <div className="nav__profile-info">
                            <div className="nav__profile-name-container">
                                <span className="nav__profile-name">{user.name}</span>
                            </div>
                            <div className="nav__profile-handle-container">
                                <span className="nav__profile-handle">{user.handle}</span>
                            </div>
                        </div>
                        <span className="nav__profile-icon">
                            <ChevronIcon />
                        </span>
                        {isOpen && (
                            <div className="nav__menu">
                                <div className="nav__menu-header">
                                    <div className="nav__profile-image">
                                        <img src={user.profileImageUrl} />
                                    </div>
                                    <div className="nav__profile-info">
                                        <div className="nav__profile-name-container">
                                            <span className="nav__profile-name">{user.name}</span>
                                        </div>
                                        <div className="nav__profile-handle-container">
                                            <span className="nav__profile-handle">
                                                {user.handle}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="nav__menu-icon">
                                        <CheckmarkIcon />
                                    </span>
                                </div>
                                <MenuItem to="/logout">Log out {user.handle}</MenuItem>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
