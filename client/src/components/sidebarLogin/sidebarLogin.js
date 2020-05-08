import React from 'react';
import './sidebarLogin.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import sidebarIllustration from '../../assets/images/twitter_login_sidebar_illustration.png';

const SidebarLogin = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__img-container">
                <img src={sidebarIllustration} alt="sidebar illustration" />
            </div>
            <p className="sidebar__slogan">Find out what's happening in the world right now.</p>
            <div className="sidebar__form-container">
                <form className="sidebar__form">
                    <Input name="email" label="Email address" groupClassName="sidebar__form-email" />
                    <Input name="password" label="Password" groupClassName="sidebar__form-password" />
                    <Button className="sidebar__form-login">Log in</Button>
                    <p className="sidebar__or">or</p>
                    <Button className="button__filled sidebar__form-register">Register</Button>
                </form>
            </div>
        </div>
    );
};

export default SidebarLogin;
