import "./CityDetails.css";
import React, { useEffect } from "react";
import { useAmadeusApi } from "../../api/amadeus/useAmadeusApi";

export default function CityDetails({ destination }) {
    const { getActivities } = useAmadeusApi();
    const [activities, setActivities] = React.useState([]);

    useEffect(() => {
        if (destination.latitude && destination.longitude) {
            const fetchActivities = async () => {
                const activityList = await getActivities(
                    destination.latitude,
                    destination.longitude
                );

                setActivities(activityList);
            };

            fetchActivities();
        }
    }, [destination]);

    return destination?.address ? (
        <div className="city-details">
            <h2>About the city</h2>
            <span>{destination.address}</span>

            <div className="city-todos mt-4">
                {activities.length > 0 ? (
                    <ul>
                        {activities.map((activity) => (
                            <li key={activity.id}>
                                <h5>{activity.name}</h5>
                                <p>{activity.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center">
                        <p>No activities found</p>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className="city-details text-center">
            <p>Select a destination</p>
        </div>
    );
}
