import React from 'react';
import Header from '../header/Header';
import Wall from '../wall/Wall';
import SidebarLogin from '../sidebarLogin/sidebarLogin';

const Landing = () => (
    <React.Fragment>
        <Header />
        <main className="main">
            <div className="container-990 flex flex-align-vertical">
                <Wall />
                <SidebarLogin />
            </div>
        </main>
    </React.Fragment>
);

export default Landing;
