import React from 'react';
import './button.scss';

const Button = ({ className, disabled, children, style, ...props }) => {
    return (
        <button className={`${className} button`} style={style} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;

