import React, { useContext } from 'react';
import Button from '../../components/button/Button';
import Backdrop from '../../components/backdrop/Backdrop';
import useHttp from '../../hooks/useHttp';
import UserContext from '../../context/UserContext';
import Loader from '../loader/Loader';
import { useHistory } from 'react-router-dom';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import './logoutModal.scss';

const LogoutModal = () => {
    const history = useHistory();
    const { request, loading, error } = useHttp();
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
        <Backdrop>
            {loading ? (
                <Loader />
            ) : (
                <div className="logout-modal">
                    <span className="logout-modal__icon">
                        <TwitterWhiteIcon />
                    </span>
                    <h2 className="logout-modal__heading">Log out of Twitter?</h2>
                    <p className="logout-modal__info">
                        You can always log back in at any time. If you just want to switch accounts,
                        you can do that from the “Account info” section.
                    </p>
                    <div className="logout-modal__actions">
                        <Button
                            onClick={() => history.goBack()}
                            className="button__cancel"
                            style={{ padding: '10px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleLogut}
                            className="button__filled"
                            style={{ padding: '10px' }}
                        >
                            Log out
                        </Button>
                    </div>
                </div>
            )}
        </Backdrop>
    );
};

export default LogoutModal;
