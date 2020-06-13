import React, { useContext, useCallback, useState, useEffect } from 'react';
import Tab from '../tab/Tab';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';
import useHttp from '../../hooks/useHttp';
import { useRouteMatch } from 'react-router-dom';

const FollowingFollowers = ({ userHandle, list }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { request } = useHttp();
    const [users, setUsers] = useState([]);
    const match = useRouteMatch();

    const startFollowing = useCallback(
        async ({ dataset }) => {
            try {
                await request(`/api/users/user/follow/${dataset.usertofollowid}`);
            } catch (e) {}
        },
        [request],
    );

    const getUsers = useCallback(
        async (userHandle, list) => {
            try {
                const response = await request(`/api/users/user/followers?handle=${userHandle}&list=${list}`, 'GET');
                if (response && response.status === 200 && response.status !== 500) {
                    setUsers(response.users);
                }
            } catch (e) {}
        },
        [request, match.url],
    );

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) getUsers(userHandle, list);
        return () => (isSubscribed = false);
    }, [userHandle, list]);

    return (
        <div className="relative">
            <div className="profile__tabs">
                <Tab exact to={`/${userHandle}/followers`}>
                    Followers
                </Tab>
                <Tab exact to={`/${userHandle}/following`}>
                    Following
                </Tab>
            </div>
            <ul className="sidebar__list relative" style={{ borderTop: '1px solid rgb(61, 84, 102)' }}>
                {users.map((user, index) => (
                    <li className="sidebar__list-item" tabIndex="0" key={index}>
                        <div
                            className="sidebar__list-item-image-container"
                            style={{
                                backgroundImage: `url(${user.profile_image_url})`,
                            }}
                        ></div>
                        <div className="sidebar__list-item-info">
                            <p className="sidebar__list-item-name" tabIndex="0">
                                {user.name}
                            </p>
                            <span className="sidebar__list-item-handle">{user.handle}</span>
                            {user.bio && <p className="profile__bio">{user.bio}</p>}
                        </div>
                        <Button
                            className={`sidebar__list-item-action ${
                                currentUser.following.includes(user._id) && 'button__unfollow'
                            }`}
                            data-usertofollowid={user._id}
                            onClick={({ target }) => {
                                if (currentUser.following.includes(target.dataset.usertofollowid)) {
                                    setCurrentUser((prev) => ({
                                        ...prev,
                                        following: prev.following.filter((id) => id !== target.dataset.usertofollowid),
                                    }));
                                    return startFollowing(target);
                                }
                                setCurrentUser((prev) => ({
                                    ...prev,
                                    following: [...prev.following, target.dataset.usertofollowid],
                                }));
                                startFollowing(target);
                            }}
                        >
                            {currentUser.following.includes(user._id) ? null : 'Follow'}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowingFollowers;
