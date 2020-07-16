import React from 'react';
import Header from '../header/Header';
import Wall from '../wall/Wall';
import SidebarLogin from '../sidebarLogin/sidebarLogin';
import Button from '../button/Button';
import { Link, useLocation } from 'react-router-dom';

import './landing.scss';

const Landing = () => {
    const location = useLocation();
    return (
        <div className="landing">
            <Header />
            <main className="lading__main">
                <div className="flex flex-align-vertical landing__main-content">
                    <Wall />
                    <SidebarLogin />
                </div>
                <div className="landing__footer">
                    <div className="landing__footer-inner">
                        <Link to="/login" tabIndex="-1" className="landing__footer-link">
                            <Button styleType="outlined" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Link
                            to={{
                                pathname: '/signup',
                                state: { background: location },
                            }}
                            tabIndex="-1"
                            className="landing__footer-link"
                        >
                            <Button styleType="filled" size="sm">
                                Signup
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Landing;
