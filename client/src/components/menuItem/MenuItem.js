import React from 'react';
import { Link } from 'react-router-dom';
import './menuItem.scss';

const MenuItem = ({ children, ...props }) => {
    return (
        <Link to="/:" {...props}>
            <li className="menuItem">{children}</li>
        </Link>
    );
};

export default MenuItem;
