import React from 'react';
import './overlay.scss';

const Overlay = ({ children }) => {
    return <div className="overlay">{children}</div>;
};

export default Overlay;
