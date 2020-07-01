import React from 'react';
import './backdrop.scss';

const Backdrop = ({ children, ...backdropProps }) => {
    return (
        <div tabIndex="-1" className="backdrop" {...backdropProps}>
            {children}
        </div>
    );
};

export default Backdrop;
