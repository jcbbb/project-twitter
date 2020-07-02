import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navlink.scss';

const Navlink = ({ icon, children, activeIcon, noLink, staticContext, ...props }) => {
    const location = useLocation();
    const isActive = location.pathname === props.to;
    if (noLink) {
        return (
            <div className="navlink relative" tabIndex="0" {...props}>
                <div className="navlink__inner" tabIndex="-1">
                    <div className="navlink__icon">{isActive && activeIcon ? activeIcon : icon}</div>
                    <div className="navlink__text">{children}</div>
                </div>
            </div>
        );
    }
    return (
        <NavLink className="navlink" activeClassName="navlink--active" tabIndex="0" {...props}>
            <div className="navlink__inner" tabIndex="-1">
                <div className="navlink__icon">{isActive && activeIcon ? activeIcon : icon}</div>
                <div className="navlink__text">{children}</div>
            </div>
        </NavLink>
    );
};

export default Navlink;
