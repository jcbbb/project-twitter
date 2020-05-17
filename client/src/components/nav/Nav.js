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

import './nav.scss';

const Nav = () => {
    return (
        <nav className="nav">
            <div className="nav__container">
                <span className="nav__icon">
                    <TwitterWhiteIcon />
                </span>
                <Navlink icon={<HomeIcon />}>Home</Navlink>
                <Navlink icon={<NotificationIcon />}>Notifications</Navlink>
                <Navlink icon={<MessageIcon />}>Messages</Navlink>
                <Navlink icon={<BookmarkIcon />}>Bookmarks</Navlink>
                <Navlink icon={<ProfileIcon />}>Profile</Navlink>
                <Navlink icon={<MoreIcon />}>More</Navlink>
                <Button className="button__filled" style={{ padding: '14px', width: '90%' }}>
                    Tweet
                </Button>
            </div>
        </nav>
    );
};

export default Nav;
