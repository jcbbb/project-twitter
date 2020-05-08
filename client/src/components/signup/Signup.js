import React from 'react';
import './signup.scss';
import { ReactComponent as TwitterWhiteIcon } from '../../assets/icons/twitter-white.svg';
import { ReactComponent as BackArrowIcon } from '../../assets/icons/back-arrow.svg';
import Button from '../button/Button';
import Input from '../input/Input';

const Signup = () => {
    return (
        <div className="signup">
            <div className="signup__header">
                <span className="signup__back">
                    <BackArrowIcon />
                </span>
                <TwitterWhiteIcon />
                <Button className="button__filled signup__next" disabled>
                    Next
                </Button>
            </div>
            <h2 className="signup__heading">Create account</h2>
            <form className="signup__form">
                <Input label="Name" name="name" groupClassName="signup__form-group" />
                <Input label="Email address" name="email" groupClassName="signup__form-group" />
            </form>
        </div>
    );
};

export default Signup;
