import React, { useEffect, useCallback, useState, useContext } from 'react';
import SearchInput from '../searchInput/SearchInput';
import Button from '../button/Button';
import useHttp from '../../hooks/useHttp';
import Loader from '../loader/Loader';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';

import './sidebar.scss';

const Sidebar = () => {
    const { request, loading } = useHttp();
    const { getUser, user, setUser } = useContext(UserContext);
    const [whoToFollowUsers, setWhoToFollowUsers] = useState([]);

    const fetchWhoToFollow = useCallback(async () => {
        try {
            const response = await request('/api/users/who-to-follow', 'GET');

            if (response && response.status === 200 && response.status !== 500) {
                setWhoToFollowUsers(response.users);
            }
        } catch (e) {}
    }, [request]);

    const startFollowing = useCallback(async ({ dataset }) => {
        try {
            await request(`/api/users/follow/${dataset.usertofollowid}`);
        } catch (e) {}
    }, []);

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
                        <li className="sidebar__list-item" tabIndex="0" key={index}>
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
                                <span className="sidebar__list-item-handle">
                                    {whoToFollowUser.handle}
                                </span>
                            </div>
                            <Button
                                className={`sidebar__list-item-action ${
                                    user.following.includes(whoToFollowUser._id) &&
                                    'button__unfollow'
                                }`}
                                data-usertofollowid={whoToFollowUser._id}
                                onClick={({ target }) => {
                                    if (user.following.includes(target.dataset.usertofollowid)) {
                                        setUser((prev) => ({
                                            ...prev,
                                            following: prev.following.filter(
                                                (id) => id !== target.dataset.usertofollowid,
                                            ),
                                        }));
                                        return startFollowing(target);
                                    }
                                    setUser((prev) => ({
                                        ...prev,
                                        following: [
                                            ...prev.following,
                                            target.dataset.usertofollowid,
                                        ],
                                    }));
                                    startFollowing(target);
                                }}
                            >
                                {user.following.includes(whoToFollowUser._id) ? null : 'Follow'}
                            </Button>
                        </li>
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
