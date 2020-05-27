import React from 'react';
import './backdrop.scss';

const Backdrop = ({ children }) => {
    return <div className="backdrop">{children}</div>;
};

export default Backdrop;
