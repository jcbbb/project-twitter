import React from 'react';
import { NavLink } from 'react-router-dom';
import './tab.scss';

const Tab = ({ children, ...props }) => {
    return (
        <NavLink {...props} className="tab" activeClassName="tab--active" tabIndex="0">
            <span className="tab__inner" tabIndex="-1">
                {children}
            </span>
        </NavLink>
    );
};

export default Tab;
