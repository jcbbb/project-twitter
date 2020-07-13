import React, { useContext, useState } from 'react';
import Backdrop from '../backdrop/Backdrop';
import MenuItem from '../menuItem/MenuItem';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import { ReactComponent as ListsIcon } from '../../assets/icons/lists.svg';
import { ReactComponent as BookmarksIcon } from '../../assets/icons/bookmark.svg';
import { ReactComponent as AdsIcon } from '../../assets/icons/ads.svg';
import { ReactComponent as AnalyticsIcon } from '../../assets/icons/analytics.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg';
import { ReactComponent as HelpCenterIcon } from '../../assets/icons/help-center.svg';

import './accountInfo.scss';

const AccountInfo = ({ active, setActive }) => {
    const { currentUser } = useContext(UserContext);
    return (
        <>
            {active && <Backdrop onClick={() => setActive((prev) => !prev)} />}
            <div className={`accountInfo ${active && 'accountInfo--active'}`}>
                <div className="accountInfo__header">
                    <h2 className="accountInfo__header-heading">Account info</h2>
                    <div className="accountInfo__header-icon" tabIndex="0">
                        <span
                            className="accountInfo__header-icon-inner"
                            tabIndex="-1"
                            onClick={() => setActive((prev) => !prev)}
                        >
                            <CloseIcon />
                        </span>
                    </div>
                </div>
                <section className="accountInfo__profile">
                    <Link to={`/${currentUser.handle}`} exact>
                        <div
                            className="accountInfo__profile-image"
                            style={{ backgroundImage: `url(${currentUser.profile_image_url})` }}
                        ></div>
                    </Link>
                    <Link to={`/${currentUser.handle}`} exact>
                        <div className="accountInfo__profile-info">
                            <div className="accountInfo__profile-name-container">
                                <span className="accountInfo__profile-name">{currentUser.name}</span>
                            </div>
                            <div className="accountInfo__profile-handle-container">
                                <span className="accountInfo__profile-handle">{currentUser.handle}</span>
                            </div>
                        </div>
                    </Link>
                </section>
                <ul className="accountInfo__menu">
                    <MenuItem icon={<ProfileIcon />} to="/profile">
                        Profile
                    </MenuItem>
                    <MenuItem icon={<ListsIcon />} to="/lists">
                        Lists
                    </MenuItem>
                    <MenuItem icon={<BookmarksIcon />} to="/bookmarks">
                        Bookmarks
                    </MenuItem>
                    <span className="accountInfo__menu-seperator"></span>
                    <MenuItem icon={<AdsIcon />} href="https://ads.twitter.com" target="_blank">
                        Twitter Ads
                    </MenuItem>
                    <MenuItem icon={<AnalyticsIcon />} href="https://analytics.twitter.com" target="_blank">
                        Analytics
                    </MenuItem>
                    <span className="accountInfo__menu-seperator"></span>
                    <MenuItem icon={<SettingsIcon />} to="/profile/settings">
                        Settings and Privacy
                    </MenuItem>
                    <MenuItem icon={<HelpCenterIcon />} href="https://support.twitter.com" target="_blank">
                        Help Center
                    </MenuItem>
                    <span className="accountInfo__menu-seperator"></span>
                    <MenuItem to="/logout">Log out</MenuItem>
                </ul>
            </div>
        </>
    );
};

export default AccountInfo;
