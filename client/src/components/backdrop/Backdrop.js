import React from 'react';
import './backdrop.scss';

const Backdrop = ({ children, noBg, ...backdropProps }) => {
    return (
        <div tabIndex="-1" className={`backdrop ${noBg && 'backdrop--noBg'}`} {...backdropProps}>
            {children}
        </div>
    );
};

export default Backdrop;
