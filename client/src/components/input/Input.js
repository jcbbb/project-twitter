import React from 'react';
import { useField } from '@formiz/core';
import './input.scss';

const Input = (props) => {
    const { setValue, value, isValid, isPristine, resetKey, errorMessage, id, isSubmitted, defaultValue } = useField(
        props,
    );

    const {
        label,
        type,
        required,
        groupClassName,
        className,
        placeholder,
        isTextarea,
        initial,
        limit,
        hasCounter,
        onInput,
        name,
        maxlength,
    } = props;
    const showError = !isValid && (!isPristine || isSubmitted);
    return (
        <div className={`${groupClassName} form-group`}>
            {isTextarea ? (
                <textarea
                    name={name}
                    key={resetKey}
                    className={`${className} form-group__input ${showError ? 'input-error' : ''}`}
                    value={value ?? ''}
                    onChange={({ target }) => setValue(target.value)}
                    aria-invalid={showError}
                    aria-required={!!required}
                    placeholder={placeholder}
                    type={type || ''}
                    id={id}
                    defaultValue={defaultValue}
                    onInput={onInput}
                    maxLength={maxlength}
                    {...props}
                ></textarea>
            ) : (
                <input
                    name={name}
                    key={resetKey}
                    className={`${className} form-group__input ${showError ? 'input-error' : ''}`}
                    value={value ?? ''}
                    onChange={({ target }) => setValue(target.value)}
                    aria-invalid={showError}
                    aria-required={!!required}
                    placeholder={placeholder}
                    type={type || ''}
                    id={id}
                    defaultValue={defaultValue}
                    onInput={onInput}
                    maxLength={maxlength}
                />
            )}
            <label htmlFor={id} className={`${className}-label form-group__label ${showError ? 'error' : ''}`}>
                {label}
            </label>
            {showError && <p className="form-group__error">{errorMessage}</p>}
            {hasCounter && (
                <span className="form-group__counter">
                    {initial}/{limit}
                </span>
            )}
        </div>
    );
};

export default Input;
