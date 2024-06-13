import './Map.css';
import React, { useEffect, useRef } from 'react';
import { loadGoogleMapsScriptComponent } from '../../utils/loadGoogleMapsComponent';

const Map = ({ markers }) => {
    const mapRef = useRef(null);

    // useEffect for initializing the map (runs once)
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
            mapRef.current = new window.google.maps.Map(document.getElementById('myMap'), mapOptions);

            console.log("Map initialized:", mapRef.current);
        };

        // Load Google Maps API script and initialize map
        loadGoogleMapsScriptComponent(initializeMap);
    }, []); // Empty dependency array ensures this useEffect runs only once

    // useEffect for handling changes to markers prop
    useEffect(() => {
        if (mapRef.current) {
            // Clear existing markers
            mapRef.current?.markers?.forEach(marker => {
                marker.setMap(null);
            });

            // Add markers from props
            markers.forEach((marker, index) => {
                new window.google.maps.Marker({
                    position: marker.position,
                    map: mapRef.current,
                    title: marker.title,
                    label: `${index + 1}`, // Optional: Marker label (e.g., 1, 2, 3...)
                });
            });
        }
    }, [markers]);

    return (
        <div style={{ height: '600px', width: '400px' }} id="myMap" className="map-container">
            {/* Map will be rendered here */}
        </div>
    );
};

export default Map;
