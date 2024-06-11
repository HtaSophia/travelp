import React from 'react';
import './Badge.css';
import PropTypes from 'prop-types';
;


function Badge(props) {
    const { tooltipText = '', color = 'primary', icon } = props;

    return (

        <span className={` badge text-bg-${color}`} >
            {icon && <i className={`bi bi-${icon}`}></i>}
            <span className="tooltiptext">{tooltipText}</span>
        </span>




    )
};


export default Badge;