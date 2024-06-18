import "./ToDo.css";
import React from "react";

export default function ToDo(props) {
    const { text = "", onRemove } = props;
    return (
        <div className="badge todo">
            <span>{text}</span>
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onRemove}
            ></button>
        </div>
    );
}
