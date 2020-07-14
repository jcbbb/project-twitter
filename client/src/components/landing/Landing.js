import React from 'react';
import Header from '../header/Header';
import Wall from '../wall/Wall';
import SidebarLogin from '../sidebarLogin/sidebarLogin';
import Button from '../button/Button';

import './landing.scss';

const Landing = () => (
    <div className="landing">
        <Header />
        <main className="lading__main">
            <div className="flex flex-align-vertical landing__main-content">
                <Wall />
                <SidebarLogin />
            </div>
            <div className="landing__footer">
                <div className="landing__footer-inner">
                    <Button styleType="outlined" size="sm" style={{ marginRight: '10px' }}>
                        Login
                    </Button>
                    <Button styleType="filled" size="sm">
                        Signup
                    </Button>
                </div>
            </div>
        </main>
    </div>
);

export default Landing;
