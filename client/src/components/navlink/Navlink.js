import React from 'react';
import { NavLink } from 'react-router-dom';
import './navlink.scss';

const Navlink = ({ icon, children, ...props }) => {
    return (
        <NavLink {...props} className="navlink" activeClassName="navlink--active">
            <div className="navlink__icon">{icon}</div>
            <p className="navlink__text">{children}</p>
        </NavLink>
    );
};

export default Navlink;
