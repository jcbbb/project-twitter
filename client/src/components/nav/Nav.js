import React from 'react';
import Navlink from '../navlink/Navlink';
import Button from '../button/Button';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { ReactComponent as MessageIcon } from '../../assets/icons/message.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/icons/bookmark.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/more.svg';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import { ReactComponent as ListsIcon } from '../../assets/icons/lists.svg';
import { ReactComponent as HashtagIcon } from '../../assets/icons/hashtag.svg';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron-bottom.svg';
import ProfileImage from '../../assets/images/profile.jpg';

import './nav.scss';

const Nav = () => {
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
                <Navlink icon={<NotificationIcon />}>Notifications</Navlink>
                <Navlink icon={<MessageIcon />}>Messages</Navlink>
                <Navlink icon={<BookmarkIcon />}>Bookmarks</Navlink>
                <Navlink icon={<ListsIcon />}>Lists</Navlink>
                <Navlink icon={<ProfileIcon />}>Profile</Navlink>
                <Navlink icon={<MoreIcon />}>More</Navlink>
                <Button className="button__filled" style={{ padding: '14px', width: '90%' }}>
                    Tweet
                </Button>
                <div className="nav__profile-container">
                    <div className="nav__profile">
                        <div className="nav__profile-image">
                            <img src={ProfileImage} alt="Profile image" />
                        </div>
                        <div className="nav__profile-info">
                            <div className="nav__profile-name-container">
                                <span className="nav__profile-name">Jane Doe</span>
                            </div>
                            <div className="nav__profile-handle-container">
                                <span className="nav__profile-handle">@janedoeatlocalhost.com</span>
                            </div>
                        </div>
                        <span className="nav__profile-icon">
                            <ChevronIcon />
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
