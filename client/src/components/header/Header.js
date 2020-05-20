import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import SearchInput from '../searchInput/SearchInput';
import Button from '../button/Button';
import { useLocation } from 'react-router-dom';
import './header.scss';
const Header = () => {
    let location = useLocation();

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
                <Link to="/login" className="header__login-action">
                    <Button className="header__login-action">Login</Button>
                </Link>
                <Link
                    to={{ pathname: '/signup', state: { background: location } }}
                    className="header__register-action"
                >
                    <Button className="button__filled">Register</Button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
