import React from 'react';
import { NavLink } from 'react-router-dom';
import './tab.scss';

const Tab = ({ children, ...props }) => {
    return (
        <NavLink {...props} className="tab" activeClassName="tab--active">
            {children}
        </NavLink>
    );
};

export default Tab;
