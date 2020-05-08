import React from 'react';
import './input.scss';

const Input = ({ type, name, label, value, placeholder, onChange, className, groupClassName, error, ...props }) => {
    return (
        <div className={`${groupClassName} form-group`}>
            <input
                className={`${className} form-group__input`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                name={name}
                id={name}
            />
            <label
                htmlFor={name}
                className={`${className}-label form-group__label`}
                style={error && { color: 'rgb(224, 36, 94)' }}
            >
                {label}
            </label>
            {error && <small style={{ color: 'rgb(224, 36, 94)' }}>{error}</small>}
        </div>
    );
};

export default Input;

