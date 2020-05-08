import React from 'react';
import './header.scss';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import SearchInput from '../searchInput/SearchInput';
import Button from '../button/Button';

const Header = () => {
    return (
        <header className="header container-1000">
            <div className="container-600 flex">
                <span className="header__icon-background">
                    <span className="header__icon">
                        <TwitterWhiteIcon />
                    </span>
                </span>
                <SearchInput />
            </div>
            <div className="header__actions">
                <Button className="header__login-action">Login</Button>
                <Button className="button__filled header__login-action">Register</Button>
            </div>
        </header>
    );
};

export default Header;

