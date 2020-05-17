import React from 'react';
import { NavLink } from 'react-router-dom';
import './navlink.scss';

const Navlink = ({ icon, children }) => {
    return (
        <NavLink to="/homie" className="navlink" activeClassName="navlink--active">
            <div className="navlink__icon">{icon}</div>
            <p className="navlink__text">{children}</p>
        </NavLink>
    );
};
export default Navlink;
