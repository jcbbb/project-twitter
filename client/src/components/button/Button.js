import React from 'react';
import './button.scss';

const Button = ({ className, children, style, ...props }) => {
    return (
        <button className={`${className} button`} style={style} {...props}>
            {children}
        </button>
    );
};

export default Button;

