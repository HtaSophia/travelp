export const loadGoogleMapsScriptComponent = (callback) => {
    const existingScript = document.getElementById('google-maps-script');

    if (!existingScript) {
        // Create a new script element
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap`;
        
        script.id = 'google-maps-script';
        script.async = true;
        script.defer = true;

        // Define callback function in global scope
        window.initMap = () => {
            if (callback) callback();
        };

        // Append the script to the document body
        document.body.appendChild(script);
    } else {
        // If script already exists, execute the callback directly
        if (callback) callback();
    }
};
