import React from 'react';
import Button from '../button/Button';

import './userPopover.scss';

const UserPopover = ({ user }) => {
    return (
        <div className="userPopover">
            <div className="userPopover__header">
                <div className="userPopover__image" style={{ backgroundImage: `url(${user.profile_image_url})` }}></div>
                <Button className="userPopover__follow-btn">Follow</Button>
            </div>
            <p className="profile__name">{user.name}</p>
            <p className="profile__handle">{user.handle}</p>
            {user.bio && <p className="profile__bio">{user.bio}</p>}
            <ul className="profile__stats">
                <li className="profile__following" tabIndex="0">
                    <span className="profile__following-count">{user.following.length}</span>
                    Following
                </li>
                <li className="profile__followers" tabIndex="0">
                    <span className="profile__followers-count">{user.followers.length}</span>
                    Followers
                </li>
            </ul>
        </div>
    );
};

export default UserPopover;
