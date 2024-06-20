import React, { useEffect, useRef } from "react";

const Map = ({ markers = [] }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.google || !window.google.maps) {
            console.error("Google Maps API not loaded.");
            return;
        }

        const mapOptions = {
            center: { lat: 40.7128, lng: -74.006 },
            zoom: 3,
            mapId: "ca25e83b67d13157",
        };
        mapRef.current = new window.google.maps.Map(
            document.getElementById("myMap"),
            mapOptions
        );
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            markers.forEach((marker) => {
                const icon = document.createElement("i");
                icon.className = `bi bi-${marker.iconInfo.icon}`;
                const pinNoGlyph = new window.google.maps.marker.PinElement({
                    background: marker.iconInfo.color,
                    borderColor: "#000000",
                    glyph: icon,
                });

                new window.google.maps.marker.AdvancedMarkerElement({
                    map: mapRef.current,
                    position: marker.position,
                    content: pinNoGlyph.element,
                    title: marker.title,
                });
            });
        }
    }, [markers]);

    return (
        <div
            style={{ height: "100%" }}
            id="myMap"
            className="map-container"
        ></div>
    );
};

export default Map;
