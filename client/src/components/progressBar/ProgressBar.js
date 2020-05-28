import React from 'react';
import './progressBar.scss';

const ProgressBar = ({ charCount, progressStyle }) => {
    return (
        <div className="progressBar-container">
            {charCount}
            <svg>
                <circle className="grey" cx="50%" cy="50%" r="15"></circle>
                <circle className="colored" cx="50%" cy="50%" r="15" style={progressStyle}></circle>
            </svg>
        </div>
    );
};

export default ProgressBar;
