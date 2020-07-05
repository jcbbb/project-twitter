import React, { useEffect, useCallback, useState, useContext } from 'react';
import SearchInput from '../searchInput/SearchInput';
import Button from '../button/Button';
import useHttp from '../../hooks/useHttp';
import useFollow from '../../hooks/useFollow';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';

import './sidebar.scss';

const Sidebar = () => {
    const { request } = useHttp();
    const { startFollowing } = useFollow();
    const { currentUser } = useContext(UserContext);
    const [whoToFollowUsers, setWhoToFollowUsers] = useState([]);

    const fetchWhoToFollow = useCallback(async () => {
        try {
            const response = await request('/api/users/who-to-follow', 'GET');

            if (response && response.status === 200 && response.status !== 500) {
                setWhoToFollowUsers(response.users);
            }
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            fetchWhoToFollow();
        }
        return () => (isSubscribed = false);
    }, [fetchWhoToFollow]);
    return (
        <aside className="sidebar">
            <SearchInput className="search-group search-group--lg" />
            <div className="sidebar__trends">
                <div className="sidebar__header sidebar__header--radius">
                    <h2 className="sidebar__heading">Trends for you</h2>
                </div>
            </div>
            <div className="sidebar__who-to-follow">
                <div className="sidebar__header">
                    <h2 className="sidebar__heading">Who to follow</h2>
                </div>
                <ul className="sidebar__list relative">
                    {whoToFollowUsers.map((whoToFollowUser, index) => (
                        <Link to={`/${whoToFollowUser.handle}`} key={index} tabIndex="-1">
                            <li className="sidebar__list-item" tabIndex="0">
                                <div className="sidebar__list-item-inner" tabIndex="-1">
                                    <div
                                        className="sidebar__list-item-image-container"
                                        style={{
                                            backgroundImage: `url(${whoToFollowUser.profile_image_url})`,
                                        }}
                                    ></div>
                                    <div className="sidebar__list-item-info">
                                        <p className="sidebar__list-item-name" tabIndex="0">
                                            {whoToFollowUser.name}
                                        </p>
                                        <span className="sidebar__list-item-handle">{whoToFollowUser.handle}</span>
                                    </div>
                                    <Button
                                        styleType={
                                            currentUser.following.includes(whoToFollowUser._id)
                                                ? 'unfollow'
                                                : 'outlined'
                                        }
                                        fit
                                        inner
                                        size="sm"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            ev.preventDefault();
                                            startFollowing(whoToFollowUser._id);
                                        }}
                                    >
                                        {currentUser.following.includes(whoToFollowUser._id) ? null : 'Follow'}
                                    </Button>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="sidebar__footer">
                    <Link to="" className="sidebar__footer-link">
                        Show more
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
