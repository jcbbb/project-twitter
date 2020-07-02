import React from 'react';
import './button.scss';

const Button = ({ className, children, size, styleType, fit, inner, ...props }) => {
    return (
        <button
            className={`button ${!inner ? `button__${styleType}` : ''} ${fit && 'button--fit'}`}
            tabIndex="0"
            {...props}
        >
            <div tabIndex="-1" className={`button--${size} button__inner ${inner && `button__${styleType}`}`}>
                {children}
            </div>
        </button>
    );
};

export default Button;
