import React, { useCallback, useContext } from 'react';
import './sidebarLogin.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import sidebarIllustration from '../../assets/images/twitter_login_sidebar_illustration.png';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMinLength } from '@formiz/validations';

const SidebarLogin = () => {
    const { request, loading } = useHttp();
    const auth = useContext(AuthContext);

    const sidebarLoginForm = useForm();

    const handleLogin = useCallback(
        async (values) => {
            try {
                const response = await request('/api/auth/login', 'POST', {
                    email: values.email,
                    password: values.password,
                });
                auth.login(response);
            } catch (err) {
                console.error(err);
            }
        },
        [request, auth],
    );

    return (
        <div className="sidebarLogin">
            <div className="sidebarLogin__img-container">
                <img src={sidebarIllustration} alt="sidebar login illustration" />
            </div>
            <p className="sidebarLogin__slogan">
                Find out what's happening in the world right now.
            </p>
            <div className="sidebarLogin__form-container">
                <Formiz connect={sidebarLoginForm} onValidSubmit={handleLogin}>
                    <form
                        className="sidebarLogin__form"
                        onSubmit={sidebarLoginForm.submit}
                        noValidate
                    >
                        <Input
                            name="email"
                            label="Email address"
                            type="email"
                            groupClassName="sidebarLogin__form-email"
                            required
                            validations={[
                                {
                                    rule: isEmail(),
                                },
                            ]}
                        />
                        <Input
                            name="password"
                            label="Password"
                            type="password"
                            groupClassName="sidebarLogin__form-password"
                            required
                            validaions={[
                                {
                                    rule: isMinLength(6),
                                },
                            ]}
                        />
                        <Button
                            style={{ padding: '10px', marginTop: '30px' }}
                            disabled={
                                loading ||
                                (!sidebarLoginForm.isValid && sidebarLoginForm.isSubmitted)
                            }
                        >
                            Log in
                        </Button>
                        <p className="sidebarLogin__or">or</p>
                    </form>
                </Formiz>
                <Link to="/signup">
                    <Button className="button__filled" style={{ padding: '10px' }}>
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SidebarLogin;
