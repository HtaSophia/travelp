import "./Travels.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useFirebase } from "../../firebase/useFirebase";
import { getAllIcons } from "../../utils/categoryIcons";

import Button from "../../components/shared/Button/Button";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";

const Travels = () => {
    const navigate = useNavigate(); // Hook for navigation
    const { getTravels } = useFirebase();
    const categoryIcons = getAllIcons();

    const [travels, setTravels] = useState([]);
    const [filteredTravels, setFilteredTravels] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("all");

    useEffect(() => {
        async function fetchTravels() {
            try {
                const travelList = await getTravels();
                console.log("Travel List: ", travelList); // Debugging log
                setTravels(travelList);
                setFilteredTravels(travelList);
            } catch (error) {
                console.error("Error fetching travels:", error);
            }
        }
        fetchTravels();
    }, []);

    const handleFilter = (category) => {
        setCategoryFilter(category);

        if (category === "all") {
            setFilteredTravels(travels);
        } else {
            setFilteredTravels(
                travels.filter((travel) => travel.category === category)
            );
        }
    };

    return (
        <div className="travels-page container py-5">
            <header className="mb-5 text-center">
                <h1>Travels</h1>
            </header>

            <section className="actions mb-5 d-flex justify-content-between align-items-center">
                <div className="left-side">
                    <p className="mb-1">
                        <strong>Filter by category</strong>
                    </p>
                    <div>
                        <Button
                            color="secondary"
                            isActive={categoryFilter === "all"}
                            onClick={() => handleFilter("all")}
                        >
                            All
                        </Button>
                        {categoryIcons.map(
                            ({ icon, text, color, category }, index) => (
                                <Button
                                    key={index}
                                    backgroundColor={color}
                                    isActive={categoryFilter === category}
                                    tooltipText={text}
                                    onClick={() => handleFilter(category)}
                                >
                                    <i className={`bi bi-${icon}`}></i>
                                </Button>
                            )
                        )}
                    </div>
                </div>

                <div className="right-side">
                    <Button onClick={() => navigate("/travel")}>
                        Create a Travel Plan
                    </Button>
                </div>
            </section>

            <div className="travels-content">
                <div className="travels-list">
                    <div className="row">
                        {filteredTravels.length > 0 ? (
                            filteredTravels.map((travel) => (
                                <div key={travel.id} className="col-md-6">
                                    <Card
                                        imgUrl={travel.imgUrl}
                                        title={travel.title}
                                        destination={travel.destination.address}
                                        description={travel.description}
                                        category={travel.category}
                                        onClick={() =>
                                            navigate(`/travel/${travel.id}`)
                                        }
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No travels found.</p>
                        )}
                    </div>
                </div>

                <div className="travels-map">
                    <Map
                        markers={filteredTravels.map((travel, index) => ({
                            position: {
                                lat: travel.destination.latitude,
                                lng: travel.destination.longitude,
                            },
                            title: travel.title,
                            index,
                        }))}
                    />
                </div>
            </div>
        </div>
    );
};

export default Travels;
