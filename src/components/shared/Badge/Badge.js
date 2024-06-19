import React from "react";
import "./Badge.css";

function Badge(props) {
    const { tooltipText = "", color = "", backgroundColor = "", icon } = props;

    return (
        <div className={`badge ${color}`} style={{ backgroundColor }}>
            {icon && <i className={`bi bi-${icon}`}></i>}
            <span className="tooltip-text">{tooltipText}</span>
        </div>
    );
}

export default Badge;
