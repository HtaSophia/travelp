import { useAmadeusContext } from "./AmadeusContext";

export function useAmadeusApi() {
    const baseUrl = "https://test.api.amadeus.com/v1";

    const { token } = useAmadeusContext();

    async function getActivities(latitude, longitude) {
        try {
            const url = `${baseUrl}/shopping/activities?latitude=${latitude}&longitude=${longitude}`;
            const response = await fetch(url, { headers: getHeaders() });
            const { data = [] } = await response.json();
            return data.slice(0, 9);
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    function getHeaders() {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    }

    return { getActivities };
}
