import React, { useContext, useEffect, useState, useCallback } from 'react';
import Button from '../button/Button';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import UserContext from '../../context/UserContext';
import Tab from '../tab/Tab';
import Tweets from '../tweets/Tweets';
import ProfileSettings from '../profileSettings/ProfileSettings';
import useHttp from '../../hooks/useHttp';
import { format } from 'date-fns';
import { Switch, Route, useRouteMatch, Link, useParams } from 'react-router-dom';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/icons/external-link.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

import './profile.scss';

const Profile = () => {
    const {
        currentUser,
        setCurrentUser,
        fetchTweets,
        tweets,
        tweetUser,
        tweetsLoading,
    } = useContext(UserContext);

    const { handle } = useParams();
    const { request } = useHttp();
    const [user, setUser] = useState(currentUser);
    const match = useRouteMatch();

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) fetchTweets(handle);
        return () => (isSubscribed = false);
    }, [fetchTweets, handle]);

    const getUser = useCallback(async (handle) => {
        try {
            const response = await request(`/api/users/user/${handle}`);
            if (response && response.status === 200 && response.status !== 500) {
                setUser(response.user);
            }
        } catch (e) {}
    });

    const startFollowing = useCallback(
        async ({ dataset }) => {
            try {
                await request(`/api/users/follow/${dataset.usertofollowid}`);
            } catch (e) {}
        },
        [request],
    );

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) getUser(handle);
        return () => (isSubscribed = false);
    }, [handle]);

    return (
        <Wall className="wall wall--320">
            <WallHeader arrow="true">{user.name || 'Profile'}</WallHeader>
            <div className="profile">
                <section
                    className="profile__banner"
                    style={{
                        backgroundImage: `url(${user.bannerImageUrl || user.banner_image_url})`,
                    }}
                ></section>
                <div className="profile__container">
                    <section className="profile__top-bar">
                        <div
                            className="profile__picture"
                            style={{
                                backgroundImage: `url(${
                                    user.profileImageUrl || user.profile_image_url
                                })`,
                            }}
                        ></div>
                        {user.handle !== currentUser.handle ? (
                            <Button
                                className={`profile__follow-btn ${
                                    currentUser.following.includes(user._id) && 'button__unfollow'
                                }`}
                                data-usertofollowid={user._id}
                                onClick={({ target }) => {
                                    if (
                                        currentUser.following.includes(
                                            target.dataset.usertofollowid,
                                        )
                                    ) {
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            following: prev.following.filter(
                                                (id) => id !== target.dataset.usertofollowid,
                                            ),
                                        }));
                                        return startFollowing(target);
                                    }
                                    setCurrentUser((prev) => ({
                                        ...prev,
                                        following: [
                                            ...prev.following,
                                            target.dataset.usertofollowid,
                                        ],
                                    }));
                                    startFollowing(target);
                                }}
                            >
                                {currentUser.following.includes(user._id) ? null : 'Follow'}
                            </Button>
                        ) : (
                            <Link to="/settings/profile">
                                <Button className="profile__follow-btn">Edit profile</Button>
                            </Link>
                        )}
                    </section>
                    <p className="profile__name">{user.name}</p>
                    <p className="profile__handle">{user.handle}</p>
                    {user.bio && <p className="profile__bio">{user.bio}</p>}
                    <ul className="profile__items">
                        {user.location && (
                            <li className="profile__item">
                                <span className="profile__item-icon">
                                    <LocationIcon />
                                </span>
                                {user.location}
                            </li>
                        )}
                        {user.website && (
                            <li className="profile__item">
                                <span className="profile__item-icon">
                                    <ExternalLinkIcon />
                                </span>
                                <a href={user.website}>{user.website}</a>
                            </li>
                        )}
                        <li className="profile__item">
                            <span className="profile__item-icon">
                                <CalendarIcon />
                            </span>
                            Joined {format(new Date(user.joined || user.createdAt), 'MMMM yyyy')}
                        </li>
                    </ul>
                    <ul className="profile__stats">
                        <li className="profile__following" tabIndex="0">
                            <span className="profile__following-count">
                                {user.following.length}
                            </span>
                            Following
                        </li>
                        <li className="profile__followers" tabIndex="0">
                            <span className="profile__followers-count">
                                {user.followers.length}
                            </span>
                            Followers
                        </li>
                    </ul>
                </div>
                <div className="profile__tabs">
                    <Tab exact to={`${match.url}`}>
                        Tweets
                    </Tab>
                    <Tab exact to={`${match.url}/media`}>
                        Media
                    </Tab>
                    <Tab exact to={`${match.url}/likes`}>
                        Likes
                    </Tab>
                </div>
            </div>
            <Switch>
                <Route path={match.path}>
                    <Tweets tweets={tweets} loading={tweetsLoading} tweetUser={tweetUser} />
                </Route>
            </Switch>
            <Switch>
                <Route path="/settings/profile">
                    <ProfileSettings />
                </Route>
            </Switch>
        </Wall>
    );
};

export default Profile;
