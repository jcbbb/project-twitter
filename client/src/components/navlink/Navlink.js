import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './navlink.scss';

const Navlink = ({ icon, children, activeIcon, ...props }) => {
    const isActive = props.location.pathname === props.to;
    return (
        <NavLink className="navlink" activeClassName="navlink--active" tabIndex="0" {...props}>
            <div className="navlink__inner" tabIndex="-1">
                <div className="navlink__icon">{isActive && activeIcon ? activeIcon : icon}</div>
                <div className="navlink__text">{children}</div>
            </div>
        </NavLink>
    );
};

export default withRouter(Navlink);
