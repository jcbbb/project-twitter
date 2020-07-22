import React, { useContext, useCallback, useState, useEffect } from 'react';
import Tab from '../tab/Tab';
import Button from '../button/Button';
import WallHeader from '../wallHeader/WallHeader';
import { UserContext } from '../../context/UserContext';
import useHttp from '../../hooks/useHttp';
import useFollow from '../../hooks/useFollow';
import { Link } from 'react-router-dom';

const FollowingFollowers = ({ userHandle, userName, list }) => {
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
            <WallHeader subheading={userHandle} arrow="true" noBorder>
                {userName || 'Profile'}
            </WallHeader>
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
                    <Link to={`/${user.handle}`} key={index} tabIndex="-1">
                        <li className="sidebar__list-item" tabIndex="0">
                            <div className="sidebar__list-item-inner" tabIndex="-1">
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
                                {currentUser._id !== user._id && (
                                    <Button
                                        styleType={currentUser.following.includes(user._id) ? 'unfollow' : 'outlined'}
                                        inner
                                        fit
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            ev.stopPropagation();
                                            startFollowing(user._id);
                                        }}
                                    >
                                        {currentUser.following.includes(user._id) ? null : 'Follow'}
                                    </Button>
                                )}
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default FollowingFollowers;
