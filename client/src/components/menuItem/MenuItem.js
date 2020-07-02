import React from 'react';
import { Link } from 'react-router-dom';
import './menuItem.scss';

const MenuItem = ({ children, icon, danger, to, href, ...props }) => {
    if (to) {
        return (
            <Link to={to} className="menuItem">
                <li {...props} className={`menuItem__inner ${danger && 'danger'}`}>
                    {icon && <span className={`menuItem__icon ${danger && 'danger'}`}>{icon}</span>}
                    {children}
                </li>
            </Link>
        );
    }
    return (
        <a href={href} className="menuItem">
            <li {...props} className={`menuItem__inner ${danger && 'danger'}`}>
                {icon && <span className={`menuItem__icon ${danger && 'danger'}`}>{icon}</span>}
                {children}
            </li>
        </a>
    );
};

export default MenuItem;
