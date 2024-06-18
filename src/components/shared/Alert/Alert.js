import React, { useEffect } from "react";

function Alert(props) {
    const [message, setMessage] = React.useState(props.message);

    useEffect(() => {
        setMessage(props.message);

        setTimeout(() => {
            setMessage(null);
        }, 3000);
    }, [props, props.message]);

    return (
        <>
            {message && (
                <div
                    className={`alert alert-${props.variant} alert-dismissible fade show position-absolute bottom-0 end-0`}
                    role="alert"
                >
                    {message}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
            )}
        </>
    );
}

export default Alert;
