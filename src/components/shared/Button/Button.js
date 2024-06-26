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
        backgroundColor = "",
        tooltipText = "",
        isActive = false,
        onClick = () => {},
    } = props;

    return (
        <button
            type={type}
            className={`btn ${
                color && !backgroundColor ? `btn-${color}` : ""
            } ${isActive ? "active" : ""}`}
            style={{ backgroundColor }}
            onClick={onClick}
        >
            {children}
            {tooltipText && <span className="tooltip-text">{tooltipText}</span>}
        </button>
    );
}

export default Button;
