import React from 'react';
import { createPortal } from 'react-dom';
import './backdrop.scss';

const Backdrop = ({ children }) => {
    return createPortal(
        <div className="overlay">{children}</div>,
        document.getElementById('modal-root'),
    );
};

export default Backdrop;
