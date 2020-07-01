import React, { useContext } from 'react';
import Button from '../../components/button/Button';
import Backdrop from '../../components/backdrop/Backdrop';
import useHttp from '../../hooks/useHttp';
import UserContext from '../../context/UserContext';
import Loader from '../loader/Loader';
import { useHistory } from 'react-router-dom';
import './modal.scss';

const Modal = ({
    info,
    heading,
    buttonProps,
    primaryButtonProps,
    backdropProps,
    icon,
    buttonText,
    primaryButtonText,
}) => {
    const history = useHistory();
    const { request, loading } = useHttp();
    const { logout } = useContext(UserContext);
    const handleLogut = async () => {
        try {
            const response = await request('/api/auth/logout');
            if (response && response.status === 200 && response.status !== 500) {
                logout();
            }
        } catch (e) {}
    };

    return (
        <Backdrop {...backdropProps}>
            {loading ? (
                <Loader msg="Logging out" />
            ) : (
                <div className="logout-modal">
                    {icon && <span className="logout-modal__icon">{icon}</span>}
                    <h2 className="logout-modal__heading">{heading || 'Log out of Twitter'}</h2>
                    <p className="logout-modal__info">
                        {info ||
                            `
                                You can always log back in at any time. If you just want to switch accounts, you can do that
                                from the “Account info” section.

                            `}
                    </p>
                    <div className="logout-modal__actions">
                        <Button onClick={() => history.goBack()} styleType="cancel" size="md" {...buttonProps}>
                            {buttonText || 'Cancel'}
                        </Button>
                        <Button onClick={handleLogut} styleType="filled" size="md" {...primaryButtonProps}>
                            {primaryButtonText || 'Log out'}
                        </Button>
                    </div>
                </div>
            )}
        </Backdrop>
    );
};

export default Modal;
