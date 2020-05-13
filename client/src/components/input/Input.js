import React from 'react';
import { useField } from '@formiz/core';
import './input.scss';

const Input = (props) => {
    const {
        setValue,
        value,
        isValid,
        isPristine,
        resetKey,
        errorMessage,
        id,
        isSubmitted,
        defaultValue,
    } = useField(props);
    const { label, type, required, groupClassName, className, placeholder, emailTaken } = props;
    const showError = !isValid && (!isPristine || isSubmitted);
    return (
        <div className={`${groupClassName} form-group`}>
            <input
                key={resetKey}
                className={`${className} form-group__input ${
                    showError || emailTaken ? 'input-error' : ''
                }`}
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
                aria-invalid={showError}
                aria-required={!!required}
                placeholder={placeholder}
                type={type || ''}
                id={id}
                defaultValue={defaultValue}
            />
            <label
                htmlFor={id}
                className={`${className}-label form-group__label ${
                    showError || emailTaken ? 'error' : ''
                }`}
            >
                {label}
            </label>
            {emailTaken && <p className="form-group__error">Email is already taken</p>}
            {showError && <p className="form-group__error">{errorMessage}</p>}
        </div>
    );
};

export default Input;
