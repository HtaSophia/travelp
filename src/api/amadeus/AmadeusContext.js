import React from "react";

const AmadeusContext = React.createContext();

async function getAuthToken() {
    const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_API_KEY}&client_secret=${process.env.REACT_APP_AMADEUS_SECRET_KEY}`,
    });
    const data = await response.json();
    return data.access_token;
}

export function AmadeusContextProvider({ children }) {
    const [token, setToken] = React.useState(null);

    React.useEffect(() => {
        const getToken = async () => {
            const authToken = await getAuthToken();
            setToken(authToken);
        };

        getToken();
    }, []);

    return (
        <AmadeusContext.Provider value={{ token }}>
            {children}
        </AmadeusContext.Provider>
    );
}

export const useAmadeusContext = () => {
    return React.useContext(AmadeusContext);
};
