import React, { useContext } from 'react';
import Button from '../button/Button';
import Wall from '../wall/Wall';
import WallHeader from '../wallHeader/WallHeader';
import UserContext from '../../context/UserContext';
import Tab from '../tab/Tab';
import Tweet from '../tweet/Tweet';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/icons/external-link.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
import ProfileImage from '../../assets/images/profile.jpg';

import './profile.scss';

const Profile = () => {
    const { user } = useContext(UserContext);
    const match = useRouteMatch();
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
                            <img src={ProfileImage} />
                        </div>
                        <Button className="profile__follow-btn">Edit profile</Button>
                    </section>
                    <p className="profile__name">{user.name}</p>
                    <p className="profile__handle">{user.handle}</p>
                    <p className="profile__bio">
                        Hosted by Brian Rose. Fighting For Free Speech Since 2011 DONATE TO OUR NEW
                        DIGITAL FREEDOM PLATFORM http://londonreal.tv/freedom
                    </p>
                    <ul className="profile__items">
                        <li className="profile__item">
                            <span className="profile__item-icon">
                                <LocationIcon />
                            </span>
                            London, England
                        </li>
                        <li className="profile__item">
                            <span className="profile__item-icon">
                                <ExternalLinkIcon />
                            </span>
                            <a href="#">https://londonreal.tv</a>
                        </li>
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
                    <Tab to={user.handle}>Tweets</Tab>
                    <Tab to={`${match.url}/media`}>Media</Tab>
                    <Tab to={`${match.url}/likes`}>Likes</Tab>
                </div>
            </div>
            <Switch>
                <Route path={`${match.path}/:params`}></Route>
                <Route path={match.path}>
                    <Tweet />
                </Route>
            </Switch>
        </Wall>
    );
};

export default Profile;
