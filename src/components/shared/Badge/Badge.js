import React from 'react';
import './Badge.css';

function Badge(props) {
    const { tooltipText = '', color = 'text-bg-primary', icon } = props;

    return (
        <div className={`badge${color}`}>
            {icon && <i className={`bi bi-${icon}`}></i>}
            <span className="tooltip-text">{tooltipText}</span>
        </div>
    )
};


export default Badge;