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
                    fields: ["formatted_address", "geometry"],
                }
            );

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    onChange({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                        address: place.formatted_address,
                    });
                }
            });

            autocompleteRef.current = autocomplete;
        }
    }, []);

    useEffect(() => {
        inputRef.current.value = value;
    }, [value]);

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
