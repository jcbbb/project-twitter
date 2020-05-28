import React from 'react';
import './wallHeader.scss';

const WallHeader = ({ children }) => {
    return (
        <div className="wall-header">
            <h2 className="wall-header__heading">{children}</h2>
        </div>
    );
};

export default WallHeader;
