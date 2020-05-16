import React from 'react';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import './login.scss';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login">
                <TwitterWhiteIcon />
            </div>
        </div>
    );
};

export default Login;
