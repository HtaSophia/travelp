import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

function Button(props) {
    const { text = '', color = 'primary-custom', icon, onClick } = props;

    return (
        <button
            type='button'
            className={`btn btn-${color}`}
            onClick={onClick}
        >
            {icon && <i className={`bi bi-${icon}`}></i>}
            {text}
        </button>
    )
}

export default Button;