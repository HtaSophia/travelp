import React from "react";
import PropTypes from "prop-types";

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
};

function Button(props) {
    const {
        children,
        type = "button",
        color = "primary-custom",
        onClick = () => {},
    } = props;

    return (
        <button type={type} className={`btn btn-${color}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
