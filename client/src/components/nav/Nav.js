import React, { useState, useContext, useEffect } from 'react';
import Navlink from '../navlink/Navlink';
import Button from '../button/Button';
import MenuItem from '../../components/menuItem/MenuItem';
import Backdrop from '../../components/backdrop/Backdrop';
import { UserContext } from '../../context/UserContext';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as HomeIconFilled } from '../../assets/icons/home-filled.svg';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { ReactComponent as NotificationIconFilled } from '../../assets/icons/notification-filled.svg';
import { ReactComponent as MessageIcon } from '../../assets/icons/message.svg';
import { ReactComponent as MessageIconFilled } from '../../assets/icons/message-filled.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/icons/bookmark.svg';
import { ReactComponent as BookmarkIconFilled } from '../../assets/icons/bookmark-filled.svg';
import { ReactComponent as ListsIcon } from '../../assets/icons/lists.svg';
import { ReactComponent as ListsIconFilled } from '../../assets/icons/lists-filled.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import { ReactComponent as ProfileIconFilled } from '../../assets/icons/profile-filled.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/more.svg';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import { ReactComponent as HashtagIcon } from '../../assets/icons/hashtag.svg';
import { ReactComponent as HashtagIconFilled } from '../../assets/icons/hashtag-filled.svg';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as CheckmarkIcon } from '../../assets/icons/checkmark.svg';
import { ReactComponent as HelpCenterIcon } from '../../assets/icons/help-center.svg';
import { ReactComponent as AnalyticsIcon } from '../../assets/icons/analytics.svg';
import { ReactComponent as AdsIcon } from '../../assets/icons/ads.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg';
import { ReactComponent as FeatherIcon } from '../../assets/icons/feather.svg';

import './nav.scss';

const Nav = () => {
    const history = useHistory();
    const location = useLocation();
    const [menu, setMenu] = useState({});
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
                    <Navlink to="/home" icon={<HomeIcon />} activeIcon={<HomeIconFilled />}>
                        Home
                    </Navlink>
                    <Navlink to="/explore" icon={<HashtagIcon />} activeIcon={<HashtagIconFilled />}>
                        Explore
                    </Navlink>
                    <Navlink to="/notifications" icon={<NotificationIcon />} activeIcon={<NotificationIconFilled />}>
                        Notifications
                    </Navlink>
                    <Navlink to="/messages" icon={<MessageIcon />} activeIcon={<MessageIconFilled />}>
                        Messages
                    </Navlink>
                    <Navlink to="/bookmarks" icon={<BookmarkIcon />} activeIcon={<BookmarkIconFilled />}>
                        Bookmarks
                    </Navlink>
                    <Navlink to="/lists" icon={<ListsIcon />} activeIcon={<ListsIconFilled />}>
                        Lists
                    </Navlink>
                    <Navlink
                        exact
                        to={`/${currentUser.handle}`}
                        icon={<ProfileIcon />}
                        activeIcon={<ProfileIconFilled />}
                    >
                        Profile
                    </Navlink>
                    <Navlink noLink icon={<MoreIcon />} onClick={() => setMenu({ id: 'more' })}>
                        More
                    </Navlink>
                    {menu.id === 'more' && (
                        <>
                            <Backdrop
                                noBg
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    setMenu({});
                                }}
                            />
                            <ul className="nav__actions-menu">
                                <MenuItem href="https://support.twitter.com" target="_blank" icon={<HelpCenterIcon />}>
                                    Help Center
                                </MenuItem>
                                <MenuItem href="https://analytics.twitter.com" target="_blank" icon={<AnalyticsIcon />}>
                                    Analytics
                                </MenuItem>
                                <MenuItem href="https://ads.twitter.com" target="_blank" icon={<AdsIcon />}>
                                    Ads
                                </MenuItem>
                                <MenuItem href="/profile/settings" target="_blank" icon={<SettingsIcon />}>
                                    Settings and Privacy
                                </MenuItem>
                            </ul>
                        </>
                    )}
                    <Button
                        size="lg"
                        styleType="filled button__round"
                        onClick={() =>
                            history.push({
                                pathname: '/compose/tweet',
                                state: { background: location },
                            })
                        }
                        icon={<FeatherIcon />}
                        style={{ margin: '10px 0', width: '90%' }}
                    >
                        Tweet
                    </Button>
                    <div className="nav__profile" tabIndex="0" onClick={() => setMenu({ id: 'profile' })}>
                        <div className="nav__profile-inner" tabIndex="-1">
                            <div
                                className="nav__profile-image"
                                style={{ backgroundImage: `url(${currentUser.profile_image_url})` }}
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
                            {menu.id === 'profile' && (
                                <>
                                    <Backdrop
                                        noBg
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            setMenu({});
                                        }}
                                    />
                                    <div className="nav__menu">
                                        <div className="nav__menu-header">
                                            <div
                                                className="nav__profile-image"
                                                style={{
                                                    backgroundImage: `url(${currentUser.profile_image_url})`,
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
