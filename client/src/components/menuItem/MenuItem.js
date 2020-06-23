import React from 'react';
import { Link } from 'react-router-dom';
import './menuItem.scss';

const MenuItem = ({ children, icon, danger, ...props }) => {
    return (
        <Link to="/" {...props}>
            <li className={`menuItem ${danger && 'danger'}`}>
                {icon && <span className={`menuItem__icon ${danger && 'danger'}`}>{icon}</span>}
                {children}
            </li>
        </Link>
    );
};

export default MenuItem;
