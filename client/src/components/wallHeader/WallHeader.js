import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BackArrowIcon } from '../../assets/icons/back-arrow.svg';
import './wallHeader.scss';

const WallHeader = ({ children, arrow, subheading, icon, noBorder }) => {
    const history = useHistory();
    return (
        <div className={`wall-header ${noBorder && 'wall-header--no-border'}`}>
            {arrow && (
                <div className="wall-header__icon wall-header__icon--m22" tabIndex="0" onClick={() => history.goBack()}>
                    <span className="wall-header__icon-inner" tabIndex="-1">
                        <BackArrowIcon />
                    </span>
                </div>
            )}
            <div className="wall-header--left">
                <h2 className="wall-header__heading">{children}</h2>
                <span className="wall-header__subheading">{subheading}</span>
            </div>
            {icon && (
                <div className="wall-header__icon" tabIndex="0">
                    <span className="wall-header__icon-inner" tabIndex="-1">
                        {icon}
                    </span>
                </div>
            )}
        </div>
    );
};

export default WallHeader;
