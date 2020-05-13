import React, { useEffect, useState, useCallback } from 'react';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import { ReactComponent as BackArrowIcon } from '../../assets/icons/back-arrow.svg';
import Button from '../button/Button';
import Input from '../input/Input';
import Overlay from '../overlay/Overlay';
//import useDebounce from '../../hooks/useDebounce';
import { useForm, Formiz, FormizStep } from '@formiz/core';
import { isEmail, isMinLength, isMaxLength, isNumber } from '@formiz/validations';
import { useHttp } from '../../hooks/useHttp';
import './signup.scss';

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const Signup = () => {
    //const debouncedEmail = useDebounce(values.email, 1000);

    const [emailTaken, setEmailTaken] = useState(false);

    const myForm = useForm();

    const { request } = useHttp();

    const handleSubmit = (values) => {
        alert(JSON.stringify(values));
    };
    const handleSendEmail = (ev) => {
        ev.preventDefault();
    };

    const checkExistingEmail = useCallback(
        async (email) => {
            setEmailTaken(false);
            try {
                const response = await request('/api/auth/check', 'POST', { email });
                if (response.status === 400) setEmailTaken(true);
            } catch (e) {}
        },
        [request],
    );

    const checkIsEmail = (email) => {
        if (email) {
            return emailRegex.test(email);
        }
    };

    useEffect(() => {
        if (checkIsEmail(myForm.values.email)) {
            checkExistingEmail(myForm.values.email);
        }
    }, [myForm.values.email, checkExistingEmail]);

    return (
        <Overlay>
            <div className="signup">
                <div className="signup__header">
                    {!myForm.isFirstStep && (
                        <span className="signup__back" onClick={myForm.prevStep}>
                            <BackArrowIcon />
                        </span>
                    )}
                    <TwitterWhiteIcon />
                    {myForm.isLastStep ? (
                        <Button
                            className="button__filled signup__next"
                            disabled={!myForm.isStepValid && myForm.isStepSubmitted}
                            type="submit"
                            onClick={myForm.submit}
                        >
                            Next
                        </Button>
                    ) : (
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
                                debounce={600}
                                required
                                emailTaken={emailTaken}
                                onChange={(value) =>
                                    myForm.setFieldsValues({ confirmEmail: value })
                                }
                                validations={[
                                    {
                                        rule: isEmail(),
                                        message: 'Provide a valid email address.',
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
                                    Регистрируясь, вы соглашаетесь с{' '}
                                    <a href="#">Условиями предоставления услуг</a> и{' '}
                                    <a href="#">Политикой конфиденциальности</a>, включая{' '}
                                    <a href="#">Политику использования файлов cookie.</a> Вас можно
                                    будет найти по адресу электронной почты или номеру телефона,
                                    если вы его укажете.{' '}
                                    <a href="#">Параметры конфиденциальности</a>
                                </p>
                            </div>
                            <Button
                                className="button__filled signup__register-btn"
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
                                label="Confirmation code"
                                name="confirmationCode"
                                required="This field is required!"
                                validations={[
                                    {
                                        rule: isMaxLength(6),
                                        message: 'Maximum of 6 characters',
                                    },
                                    {
                                        rule: isNumber(),
                                        message: 'Enter numeric values',
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
        </Overlay>
    );
};

export default Signup;
