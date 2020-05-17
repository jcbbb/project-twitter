import React from 'react';
import './sidebarLogin.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import sidebarIllustration from '../../assets/images/twitter_login_sidebar_illustration.png';
import { Link } from 'react-router-dom';
import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMinLength } from '@formiz/validations';

const SidebarLogin = () => {
    const handleSubmit = (values) => {
        console.log(values);
    };
    const sidebarForm = useForm();
    return (
        <div className="sidebar">
            <div className="sidebar__img-container">
                <img src={sidebarIllustration} alt="sidebar illustration" />
            </div>
            <p className="sidebar__slogan">Find out what's happening in the world right now.</p>
            <div className="sidebar__form-container">
                <Formiz connect={sidebarForm} onValidSubmit={handleSubmit}>
                    <form className="sidebar__form" onSubmit={sidebarForm.submit} noValidate>
                        <Input
                            name="email"
                            label="Email address"
                            type="email"
                            groupClassName="sidebar__form-email"
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
                            groupClassName="sidebar__form-password"
                            required="Enter your password"
                            validaions={[
                                {
                                    rule: isMinLength(6),
                                },
                            ]}
                        />
                        <Button style={{ padding: '10px', marginTop: '30px' }}>Log in</Button>
                        <p className="sidebar__or">or</p>
                        <Link to="/signup">
                            <Button className="button__filled" style={{ padding: '10px' }}>
                                Register
                            </Button>
                        </Link>
                    </form>
                </Formiz>
            </div>
        </div>
    );
};

export default SidebarLogin;
