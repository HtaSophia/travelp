export const initializeGoogleApiScript = () => {
    const googleApiUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,marker&loading=async`;
    const googleScript = document.createElement("script");
    googleScript.src = googleApiUrl;
    googleScript.async = true;
    googleScript.defer = true;
    document.head.appendChild(googleScript);
};
