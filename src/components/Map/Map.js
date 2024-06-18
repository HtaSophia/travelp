import "./Map.css";
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
            zoom: 12,
        };
        mapRef.current = new window.google.maps.Map(
            document.getElementById("myMap"),
            mapOptions
        );
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current?.markers?.forEach((marker) => {
                marker.setMap(null);
            });

            markers.forEach((marker, index) => {
                new window.google.maps.Marker({
                    position: marker.position,
                    map: mapRef.current,
                    title: marker.title,
                    label: `${index + 1}`,
                });
            });
        }
    }, [markers]);

    return (
        <div
            style={{ height: "600px", width: "400px" }}
            id="myMap"
            className="map-container"
        ></div>
    );
};

export default Map;
