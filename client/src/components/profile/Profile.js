import React from 'react';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/icons/external-link.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';

const Profile = () => {
    return (
        <div className="profile">
            <section className="profile__banner"></section>
            <section className="">
                <div className="profile__picture">
                    <img></img>
                </div>
                <Button className="profile__follow-btn">Follow</Button>
            </section>
            <p className="profile__name">London Real</p>
            <p className="profile__tag">@LondonRealTV</p>
            <p className="profile__description">
                Hosted by Brian Rose. Fighting For Free Speech Since 2011 DONATE TO OUR NEW DIGITAL FREEDOM PLATFORM
                http://londonreal.tv/freedom
            </p>
            <ul className="profile__items">
                <li className="profile__item">
                    <LocationIcon />
                    London, England
                </li>
                <li className="profile__item">
                    <ExternalLinkIcon />
                    <a href="#">https://londonreal.tv</a>
                </li>
                <li className="profile__item">
                    <CalendarIcon />
                    Joined: September 2011
                </li>
            </ul>
            <ul className="profile__meta">
                <li className="profile__following">
                    <span className="profile__following-count">352</span>
                    following
                </li>
                <li className="profile__followers">
                    <span className="profile__followers-count"> 151,1k</span>
                    followers
                </li>
            </ul>
        </div>
    );
};

export default Profile;
