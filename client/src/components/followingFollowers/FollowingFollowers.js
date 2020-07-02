import React, { useContext, useCallback, useState, useEffect } from 'react';
import Tab from '../tab/Tab';
import Button from '../button/Button';
import UserContext from '../../context/UserContext';
import useHttp from '../../hooks/useHttp';
import useFollow from '../../hooks/useFollow';

const FollowingFollowers = ({ userHandle, list }) => {
    const { currentUser } = useContext(UserContext);
    const { request } = useHttp();
    const { startFollowing } = useFollow();
    const [users, setUsers] = useState([]);

    const getUsers = useCallback(
        async (userHandle, list) => {
            try {
                const response = await request(`/api/users/user/followers?handle=${userHandle}&list=${list}`, 'GET');
                if (response && response.status === 200 && response.status !== 500) {
                    setUsers(response.users);
                }
            } catch (e) {}
        },
        [request],
    );

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) getUsers(userHandle, list);
        return () => (isSubscribed = false);
    }, [userHandle, list, getUsers]);

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
                        <div className="sidebar__list-item-inner">
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
                                styleType={currentUser.following.includes(user._id) ? 'unfollow' : 'outlined'}
                                inner
                                fit
                                onClick={() => startFollowing(user._id)}
                            >
                                {currentUser.following.includes(user._id) ? null : 'Follow'}
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowingFollowers;
