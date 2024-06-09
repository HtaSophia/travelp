import React, { useState } from 'react'
import './Button.css'
import PropTypes from 'prop-types'

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired, 
    icon: PropTypes.string,                 
    onClick: PropTypes.func,                
}

function Button(props) {
    const { text, color, icon, onClick } = props;

    // Use a state for the color style if needed
    const [colorStyle] = useState(color);

    return (
        <button 
            type='button' 
            className='button' 
            style={{ backgroundColor: colorStyle }} 
            onClick={onClick}
        >
            {icon && <img src={icon} alt="icon" className='button-icon' />}
            {text}
        </button>
    )
}

export default Button;