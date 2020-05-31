import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BackArrowIcon } from '../../assets/icons/back-arrow.svg';
import './wallHeader.scss';

const WallHeader = ({ children, arrow }) => {
    const history = useHistory();
    return (
        <div className="wall-header">
            {arrow && (
                <span className="wall-header__icon" onClick={() => history.goBack()}>
                    <BackArrowIcon />
                </span>
            )}
            <h2 className="wall-header__heading">{children}</h2>
        </div>
    );
};

export default WallHeader;
