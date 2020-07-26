import React, { forwardRef } from 'react';
import './button.scss';

const Button = ({ className, children, size, styleType, fit, inner, icon, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={`button ${!inner ? `button__${styleType}` : ''} ${fit && 'button--fit'}`}
            tabIndex="0"
            {...props}
        >
            <div tabIndex="-1" className={`button--${size} button__inner ${inner && `button__${styleType}`}`}>
                <span className="button__text">{children}</span>
                {icon && <span className="button__icon">{icon}</span>}
            </div>
        </button>
    );
};

export default forwardRef(Button);
