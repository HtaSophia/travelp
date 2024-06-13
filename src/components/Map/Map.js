import './Map.css';
import React, { useEffect } from 'react';
import { loadGoogleMapsScript } from '../../utils/loadGoogleMaps';

const Map = ({ markers }) => {
    useEffect(() => {
        const initializeMap = () => {
            // Check if google maps is already initialized
            if (!window.google || !window.google.maps) {
                console.error("Google Maps API not loaded.");
                return;
            }

            // Initialize the map
            const mapOptions = {
                center: { lat: 40.7128, lng: -74.006 }, // Initial center position (New York)
                zoom: 12, // Initial zoom level
            };
            const map = new window.google.maps.Map(document.getElementById('googleMaps'), mapOptions);

            // Add markers from props
            markers.forEach((marker, index) => {
                new window.google.maps.Marker({
                    position: marker.position,
                    map: map,
                    title: marker.title,
                    label: `${index + 1}`, // Optional: Marker label (e.g., 1, 2, 3...)
                });
            });
        };

        // Load Google Maps API script
        loadGoogleMapsScript(initializeMap);
    }, [markers]); // Ensure useEffect runs whenever markers prop changes

    return (
        <div id="googleMaps" className="map-container">
            {/* Map will be rendered here */}
        </div>
    );
};

export default Map;
