import React from 'react';
import './wall.scss';

const Wall = ({ children, className }) => {
    return <div className={`wall ${className}`}>{children}</div>;
};

export default Wall;
