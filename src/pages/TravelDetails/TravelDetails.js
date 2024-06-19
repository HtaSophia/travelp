import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../../firebase/useFirebase";
import { useUnsplashApi } from "../../api/unsplash/useUnsplashApi";

import { getIconByCategory } from "../../utils/iconByCategory";

import Alert from "../../components/shared/Alert/Alert";
import Badge from "../../components/shared/Badge/Badge";
import Button from "../../components/shared/Button/Button";
import CarouselComponent from "../../components/Carousel/CarouselComponent";
import CityDetails from "../../components/CityDetails/CityDetails";

export default function TravelDetails() {
    const navigate = useNavigate();
    const { travelId } = useParams();
    const { getTravel } = useFirebase();
    const { getPhotos } = useUnsplashApi();

    const [isLoading, setIsLoading] = useState(false);
    const [travel, setTravel] = useState(null);
    const [badgeInfo, setBadgeInfo] = useState({});
    const [imageUrls, setImageUrls] = useState([]);
    const [alert, setAlert] = React.useState({ message: "", variant: "" });

    useEffect(() => {
        const handleGetTravel = async (travelId) => {
            setIsLoading(true);

            try {
                const data = await getTravel(travelId);
                if (!data) {
                    setAlert({
                        message: "Travel not found",
                        variant: "danger",
                    });
                    return;
                }

                setTravel(data);
                setBadgeInfo(getIconByCategory(data.category));

                const photos = await getPhotos(data.destination.address);
                setImageUrls(photos);
            } catch (error) {
                console.error(error.message);
                setAlert({ message: error.message, variant: "danger" });
            } finally {
                setIsLoading(false);
            }
        };

        if (travelId) handleGetTravel(travelId);
    }, []);

    if (!travelId || !travel) {
        return (
            <div className="container travel-details py-5 text-center">
                <p>Travel not found</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container travel-details py-5">
                <span className="placeholder col-6"></span>
                <span className="placeholder w-75"></span>
                <span className="placeholder w-100"></span>
            </div>
        );
    }

    return (
        <div className="container py-5 travel-details">
            <section className="d-flex justify-content-between align-items-center mb-3">
                <div className="left-side">
                    <p className="mb-0 mt-3">
                        <small>
                            {travel.startDate.toDate().toDateString()}
                            {travel.endDate
                                ? ` - ${travel.endDate.toDate().toDateString()}`
                                : ""}
                        </small>
                    </p>
                    <h1>
                        {travel.title} - {travel.destination.address}
                    </h1>
                </div>
                <div className="right-side">
                    <Badge
                        tooltipText={badgeInfo.text}
                        backgroundColor={badgeInfo.color}
                        icon={badgeInfo.icon}
                    />
                </div>
            </section>

            <CarouselComponent imageUrls={imageUrls} />

            <section className="mt-5 d-flex justify-content-between">
                <div className="left-side">
                    <h2>Description</h2>
                    <p className="mt-3">{travel.description}</p>
                </div>
                <div className="right-side">
                    <Button onClick={() => navigate(`/travel/${travelId}`)}>
                        Edit
                    </Button>
                </div>
            </section>

            <section className="mt-5">
                <h2>To do</h2>
                <ul>
                    {travel.todoList.map((todo, index) => (
                        <li key={index}>{todo}</li>
                    ))}
                </ul>
            </section>

            <hr className="my-5" />

            <section>
                <CityDetails destination={travel.destination} />
            </section>

            <Alert message={alert.message} variant={alert.variant} />
        </div>
    );
}
