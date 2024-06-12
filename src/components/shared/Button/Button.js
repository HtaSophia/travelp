import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
}

function Button(props) {
    const { text = '', type = 'button', color = 'primary-custom', icon, onClick = () => { } } = props;

    return (
        <button
            type={type}
            className={`btn btn-${color}`}
            onClick={onClick}
        >
            {icon && <i className={`bi bi-${icon}`}></i>}
            {text}
        </button>
    )
}

export default Button;