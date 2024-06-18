import React, { useEffect, useRef } from "react";

const AutocompleteInput = ({ id, name, value, placeholder, onChange }) => {
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                inputRef.current,
                {
                    types: ["geocode"],
                    fields: ["formatted_address", "geometry", "rating"],
                }
            );

            inputRef.current.value = value;
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const latitude = place.geometry.location.lat();
                    const longitude = place.geometry.location.lng();
                    const address = place.formatted_address;

                    onChange({ latitude, longitude, address });
                }
            });

            autocompleteRef.current = autocomplete;
        }
    }, []);

    return (
        <input
            ref={inputRef}
            className="form-control"
            id={id}
            name={name}
            type="text"
            placeholder={placeholder}
            required
        />
    );
};

export default AutocompleteInput;
