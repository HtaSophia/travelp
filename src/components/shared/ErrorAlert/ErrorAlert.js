import React, { useEffect } from 'react'

function ErrorAlert(props) {
    const [error, setError] = React.useState(props.error);

    useEffect(() => {
        setError(props.error);

        setTimeout(() => {
            setError(null);
        }, 3000)
    }, [props, props.error]);

    return (<>
        {
            error && <div className={`alert alert-${props.variant} alert-dismissible fade show position-absolute bottom-0 end-0`} role="alert">
                Some error occurred: {error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        }
    </>);
}

export default ErrorAlert;
