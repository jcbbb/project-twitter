import React from 'react';
import './button.scss';

const Button = ({ className, children, size, styleType, fit, ...props }) => {
    return (
        <button className={`button button__${styleType} ${fit && 'button--fit'}`} tabIndex="0" {...props}>
            <div tabIndex="-1" className={`button--${size} button__inner`}>
                {children}
            </div>
        </button>
    );
};

export default Button;
