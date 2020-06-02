import React, { useContext, useEffect, useState, useCallback } from 'react';
import Button from '../button/Button';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import UserContext from '../../context/UserContext';
import Tab from '../tab/Tab';
import useHttp from '../../hooks/useHttp';
import Tweets from '../tweets/Tweets';
import ProfileSettings from '../profileSettings/ProfileSettings';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/icons/external-link.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

import './profile.scss';

const Profile = () => {
    const { user } = useContext(UserContext);
    const match = useRouteMatch();
    const { request, loading } = useHttp();
    const [tweets, setTweets] = useState([]);
    const [tweetUser, setTweetUser] = useState({});

    const fetchTweets = useCallback(async () => {
        try {
            const response = await request('/api/users/user/tweets', 'GET');
            if (response.status === 200 && response.status !== 500) {
                setTweets(response.tweets);
                setTweetUser(response.user);
            }
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            fetchTweets();
        }
        return () => (isSubscribed = false);
    }, [request]);
    return (
        <Wall className="wall wall--320">
            <WallHeader arrow="true">{user.name}</WallHeader>
            <div className="profile">
                <section className="profile__banner">
                    <img />
                </section>
                <div className="profile__container">
                    <section className="profile__top-bar">
                        <div className="profile__picture">
                            <img src={user.profileImageUrl} />
                        </div>
                        <Link to="/settings/profile">
                            <Button className="profile__follow-btn">Edit profile</Button>
                        </Link>
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
                                <a href="#">{user.website}</a>
                            </li>
                        )}
                        <li className="profile__item">
                            <span className="profile__item-icon">
                                <CalendarIcon />
                            </span>
                            Joined: September 2011
                        </li>
                    </ul>
                    <ul className="profile__stats">
                        <li className="profile__following" tabIndex="0">
                            <span className="profile__following-count">352</span>
                            Following
                        </li>
                        <li className="profile__followers" tabIndex="0">
                            <span className="profile__followers-count"> 151,1k</span>
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
                    <Tweets tweets={tweets} loading={loading} tweetUser={tweetUser} />
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
