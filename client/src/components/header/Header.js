import React from 'react';
import SearchInput from '../searchInput/SearchInput';
import Button from '../button/Button';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';

import './header.scss';

const Header = () => {
    const location = useLocation();
    return (
        <header className="header">
            <div className="header__inner container-1000">
                <div className="container-600 flex header__left">
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
                    <Link
                        to="/signup"
                        to={{
                            pathname: '/signup',
                            state: { background: location },
                        }}
                        style={{ outline: 'none' }}
                        tabIndex="-1"
                    >
                        <Button styleType="filled">Sign up</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
