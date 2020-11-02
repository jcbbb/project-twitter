import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './menuItem.scss';

const MenuItem = ({ children, icon, danger, to, href, ...props }) => {
    if (to) {
        return (
            <Link to={to} className="menuItem" tabIndex="0">
                <li {...props} className={`menuItem__inner ${danger && 'danger'}`} tabIndex="-1">
                    {icon && <span className={`menuItem__icon ${danger && 'danger'}`}>{icon}</span>}
                    <span className="menuItem__inner-text">{children}</span>
                </li>
            </Link>
        );
    } else if (href) {
        return (
            <a href={href} className="menuItem" tabIndex="0">
                <li {...props} className={`menuItem__inner ${danger && 'danger'}`} tabIndex="-1">
                    {icon && <span className={`menuItem__icon ${danger && 'danger'}`}>{icon}</span>}
                    <span className="menuItem__inner-text">{children}</span>
                </li>
            </a>
        );
    } else
        return (
            <div href={href} className="menuItem" tabIndex="0">
                <li {...props} className={`menuItem__inner ${danger && 'danger'}`} tabIndex="-1">
                    {icon && <span className={`menuItem__icon ${danger && 'danger'}`}>{icon}</span>}
                    {children}
                </li>
            </div>
        );
};

export default MenuItem;
