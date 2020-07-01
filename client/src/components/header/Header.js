import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import SearchInput from '../searchInput/SearchInput';
import Button from '../button/Button';
import './header.scss';
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
                <Link to="/login" style={{ marginRight: '10px', outline: 'none' }} tabIndex="-1">
                    <Button styleType="outlined">Login</Button>
                </Link>
                <Link to="/signup" style={{ outline: 'none' }} tabIndex="-1">
                    <Button styleType="filled">Sign up</Button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
