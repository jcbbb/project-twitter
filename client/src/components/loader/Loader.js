import React from 'react';
import './loader.scss';

const Loader = ({ msg }) => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <p className="loader__msg">{msg}</p>
        </div>
    );
};

export default Loader;
