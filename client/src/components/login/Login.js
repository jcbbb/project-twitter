import React, { useCallback, useContext } from 'react';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import Input from '../input/Input';
import Button from '../button/Button';
import useHttp from '../../hooks/useHttp';
import UserContext from '../../context/UserContext';
import Loader from '../../components/loader/Loader';
import Backdrop from '../../components/backdrop/Backdrop';
import { Formiz } from '@formiz/core';
import { Link } from 'react-router-dom';
import './login.scss';
import { isMinLength, isEmail } from '@formiz/validations';
import { useForm } from '@formiz/core';

const Login = () => {
    const myForm = useForm();
    const { login, getUser } = useContext(UserContext);
    const { request, loading, error } = useHttp();
    const handleSubmit = useCallback(
        async (values) => {
            try {
                const response = await request('/api/auth/login', 'POST', {
                    email: values.email,
                    password: values.password,
                });
                if (response.status === 200 && response.status !== 500) {
                    return login() && getUser();
                }
            } catch (e) {}
        },
        [request, login, getUser],
    );

    return (
        <>
            {loading && (
                <Backdrop>
                    <Loader />
                </Backdrop>
            )}
            <div className="login-container">
                <div className="login">
                    <span className="login__icon">
                        <TwitterWhiteIcon />
                    </span>
                    <h1 className="login__heading">Login to twitter</h1>
                    {error && (
                        <p
                            style={{ alignSelf: 'flex-start', marginBottom: '5px' }}
                            className="error"
                        >
                            {error.message}
                        </p>
                    )}
                    <Formiz connect={myForm} onValidSubmit={handleSubmit}>
                        <form onSubmit={myForm.submit} noValidate className="login__form">
                            <Input
                                label="Email address"
                                name="email"
                                groupClassName="login__form-group"
                                required
                                validations={[
                                    {
                                        rule: isEmail(),
                                    },
                                ]}
                            />
                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                required
                                groupClassName="login__form-group"
                                validations={[
                                    {
                                        rule: isMinLength(6),
                                    },
                                ]}
                            />
                            <Button
                                className="button__filled"
                                disabled={!myForm.isValid}
                                type="submit"
                                style={{ padding: '14px' }}
                            >
                                Login
                            </Button>
                        </form>
                    </Formiz>
                    <Link to="/signup" className="login__link">
                        Sign up for Twitter
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
