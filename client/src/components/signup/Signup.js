import React, { useState, useCallback, useContext } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import Backdrop from '../backdrop/Backdrop';
import useHttp from '../../hooks/useHttp';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { useForm, Formiz, FormizStep } from '@formiz/core';
import { isEmail, isNumber, isMinLength } from '@formiz/validations';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import { ReactComponent as BackArrowIcon } from '../../assets/icons/back-arrow.svg';
import './signup.scss';

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const Signup = () => {
    const [emailTaken, setEmailTaken] = useState(false);
    const [hasMatch, setHasMatch] = useState(false);
    const { login, getCurrentUser } = useContext(UserContext);
    const history = useHistory();

    const myForm = useForm();

    const { request, loading } = useHttp();

    const handleSubmit = useCallback(
        async (values) => {
            try {
                const response = await request('/api/auth/signup', 'POST', {
                    email: values.email,
                    name: values.name,
                    password: values.password,
                });

                if (response && response.status === 201 && response.status !== 500) {
                    login();
                    getCurrentUser();
                    history.push('/home');
                }
            } catch (e) {}
        },
        [request, login, getCurrentUser, history],
    );

    const handleSendEmail = useCallback(
        async (ev) => {
            ev.preventDefault();
            try {
                const { email } = myForm.values;
                const { status, verificationCode } = await request('/api/auth/tempuser', 'POST', {
                    email,
                });
                if (status === 201 || status === 200) {
                    await request('/api/send/verification', 'POST', {
                        email,
                        verificationCode,
                    });
                }
            } catch (e) {}
        },
        [request, myForm.values],
    );

    const verifyCode = useCallback(
        async (email, verificationCode) => {
            setHasMatch(false);
            try {
                const response = await request('/api/auth/email/verify', 'POST', {
                    email,
                    verificationCode,
                });
                if (response.isMatch) {
                    setHasMatch(true);
                }
            } catch (err) {}
        },
        [request],
    );

    const checkExistingEmail = useCallback(
        async (email) => {
            setEmailTaken(false);
            try {
                const response = await request('/api/auth/email/check', 'POST', { email });
                if (!response) {
                    setEmailTaken(true);
                }
            } catch (err) {}
        },
        [request, setEmailTaken],
    );

    const checkIsEmail = (email) => {
        if (email) {
            return emailRegex.test(email);
        }
    };

    return (
        <Backdrop>
            <div className="signup">
                <div className="signup__header">
                    {!myForm.isFirstStep && (
                        <span className="signup__back" onClick={myForm.prevStep}>
                            <BackArrowIcon />
                        </span>
                    )}
                    <span className="signup__header-icon">
                        <TwitterWhiteIcon />
                    </span>
                    {myForm.isLastStep ? (
                        <Button
                            className="button__filled signup__next"
                            disabled={loading || (!myForm.isStepValid && myForm.isStepSubmitted)}
                            type="submit"
                            onClick={myForm.submit}
                        >
                            Next
                        </Button>
                    ) : myForm.currentStep.name === 'step2' ? null : (
                        <Button
                            className="button__filled signup__next"
                            onClick={myForm.nextStep}
                            disabled={emailTaken || !myForm.isStepValid}
                            type="submit"
                        >
                            Next
                        </Button>
                    )}
                </div>
                <h2 className="signup__heading">
                    {myForm.currentStep.name === 'step3'
                        ? 'We sent you a code'
                        : myForm.currentStep.name === 'step4'
                        ? 'You need a password'
                        : 'Create account'}
                </h2>
                <Formiz connect={myForm} onValidSubmit={handleSubmit}>
                    <form className="signup__form" noValidate>
                        <FormizStep name="step1">
                            <Input
                                label="Name"
                                type="text"
                                name="name"
                                maxlength="50"
                                keepValue="true"
                                groupClassName="signup__form-group"
                                required="What's your name?"
                                onChange={(value) => myForm.setFieldsValues({ confirmName: value })}
                            />
                            <Input
                                label="Email address"
                                type="email"
                                name="email"
                                groupClassName="signup__form-group"
                                required
                                onChange={(value) => {
                                    myForm.setFieldsValues({ confirmEmail: value });
                                    if (checkIsEmail(value)) {
                                        checkExistingEmail(value);
                                    }
                                }}
                                validations={[
                                    {
                                        rule: isEmail(),
                                        message: 'Provide a valid email address.',
                                    },
                                    {
                                        rule: () => !emailTaken,
                                        deps: [emailTaken],
                                        message: 'Email is already taken',
                                    },
                                ]}
                            />
                        </FormizStep>
                        <FormizStep name="step2">
                            <Input
                                type="text"
                                label="Name"
                                defaultValue={myForm.values.name}
                                name="confirmName"
                                groupClassName="signup__form-group"
                                onChange={() => myForm.prevStep()}
                            />
                            <Input
                                type="email"
                                label="Email address"
                                defaultValue={myForm.values.email}
                                name="confirmEmail"
                                onChange={() => myForm.prevStep()}
                            />
                            <div className="signup__tos">
                                <p className="signup__tos-text">
                                    By signing up, you agree with{' '}
                                    <a href="https://twitter.com/tos" className="signup__link">
                                        Terms of service
                                    </a>{' '}
                                    and{' '}
                                    <a className="signup__link" href="https://twitter.com/tos">
                                        Privacy policy
                                    </a>
                                    , including{' '}
                                    <a className="signup__link" href="https://twitter.com/tos">
                                        Cookie policy.
                                    </a>{' '}
                                    You can be found by your email address or phone number if you
                                    specified.{' '}
                                    <a className="signup__link" href="https://twitter.com/tos">
                                        Privacy Settings
                                    </a>
                                </p>
                            </div>
                            <Button
                                className="button__filled signup__register-btn"
                                type="button"
                                onClick={(ev) => {
                                    myForm.nextStep();
                                    handleSendEmail(ev);
                                }}
                            >
                                Register
                            </Button>
                        </FormizStep>
                        <FormizStep name="step3">
                            <p className="signup__code-info">
                                Enter the code in the field below to confirm {myForm.values.email}.
                            </p>
                            <Input
                                type="text"
                                label="Verification Code"
                                name="verificationCode"
                                required="This field is required"
                                onChange={(value) => {
                                    if (value?.length >= 5) {
                                        verifyCode(myForm.values.email, value);
                                    }
                                }}
                                validations={[
                                    {
                                        rule: isMinLength(6),
                                        message: 'Minimum of 6 characters',
                                    },
                                    {
                                        rule: isNumber(),
                                        message: 'Only numeric values are allowed',
                                    },
                                    {
                                        rule: () => hasMatch,
                                        deps: [hasMatch],
                                        message: "Verification code doesn't match",
                                    },
                                ]}
                            />
                        </FormizStep>
                        <FormizStep name="step4">
                            <p className="signup__code-info">
                                Password should no less than 6 characters.
                            </p>
                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                groupClassName="signup__form-group"
                                required="Choose a password."
                                validations={[
                                    {
                                        rule: isMinLength(6),
                                        message: 'Password should be minimum 6 characters',
                                    },
                                ]}
                            />
                        </FormizStep>
                    </form>
                </Formiz>
            </div>
        </Backdrop>
    );
};

export default Signup;
