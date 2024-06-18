import "./TravelForm.css";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../../firebase/useFirebase";

import ToDo from "../../components/ToDo/ToDo";
import Button from "../../components/shared/Button/Button";
import CityDetails from "../../components/CityDetails/CityDetails";
import AutocompleteInput from "../../components/AutocompleteInput/AutocompleteInput";
import Alert from "../../components/shared/Alert/Alert";

export default function TravelForm() {
    const { travelId } = useParams();
    const navigate = useNavigate();
    const { getTravel, createTravel, updateTravel, deleteTravel } =
        useFirebase();
    const [alert, setAlert] = React.useState({ message: "", variant: "" });

    const [travelForm, setTravelForm] = React.useState({
        destination: { latitude: 0, longitude: 0, address: "" },
        title: "",
        category: "",
        startDate: "",
        endDate: "",
        description: "",
        todoList: [],
    });

    useEffect(() => {
        const handleGetTravel = async (travelId) => {
            try {
                const data = await getTravel(travelId);
                if (!data) {
                    setAlert({
                        message: "Travel not found",
                        variant: "danger",
                    });
                    navigateToTravels();
                }

                const { startDate, endDate, ...currentTravel } = data;

                const formattedStartDate = new Date(startDate.toDate())
                    .toISOString()
                    .split("T")[0];
                const formattedEndDate = endDate
                    ? new Date(endDate.toDate()).toISOString().split("T")[0]
                    : "";

                setTravelForm({
                    ...currentTravel,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                });
            } catch (error) {
                console.error(error.message);
            }
        };

        if (travelId) handleGetTravel(travelId);
    }, []);

    const handleDestinationChange = (destination) => {
        setTravelForm((prevTravelForm) => ({
            ...prevTravelForm,
            destination,
        }));
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setTravelForm((prevTravelForm) => ({
            ...prevTravelForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { ...travelForm };

        try {
            if (travelId) {
                await updateTravel({ ...data, id: travelId });
                setAlert({
                    message: "Travel updated successfully",
                    variant: "success",
                });
            } else {
                await createTravel({ ...data });
                setAlert({
                    message: "Travel created successfully",
                    variant: "success",
                });
                navigateToTravels();
            }
        } catch (error) {
            setAlert({ message: error.message, variant: "danger" });
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTravel(travelId);
            setAlert({
                message: "Travel deleted successfully",
                variant: "success",
            });
            navigateToTravels();
        } catch (error) {
            setAlert({ message: error.message, variant: "danger" });
        }
    };

    const handleAddTodo = (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();

        const value = event.target.value;
        if (!value.trim()) return;

        setTravelForm((prevTravelForm) => ({
            ...prevTravelForm,
            todoList: [...prevTravelForm.todoList, value],
        }));
        event.target.value = "";
    };

    const handleRemoveTodo = (index) => {
        const updatedTodos = [...travelForm.todoList];
        updatedTodos.splice(index, 1);

        setTravelForm((prevTravelForm) => ({
            ...prevTravelForm,
            todoList: updatedTodos,
        }));
    };

    const navigateToTravels = () => {
        navigate("/travels");
    };

    return (
        <div className="container py-5 travel-form">
            <header className="text-center mb-5">
                <h1>{travelId ? "Edit" : "Create"} a Travel Plan</h1>
            </header>

            <section>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="destination" className="form-label">
                            Destination*
                        </label>

                        <AutocompleteInput
                            id="destination"
                            name="destination"
                            placeholder="i.e. Toronto, Canada"
                            value={travelForm.destination.address}
                            onChange={handleDestinationChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">
                            Title*
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="i.e. My Trip to Canada"
                            value={travelForm.title}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">
                            Category*
                        </label>
                        <select
                            className="form-select"
                            aria-label="Category selector"
                            id="category"
                            name="category"
                            value={travelForm.category}
                            onChange={handleFormChange}
                            required
                        >
                            <option defaultValue={""}>Select Category</option>
                            <option value="favorite">Favorite</option>
                            <option value="wantToGo">Want to go</option>
                            <option value="booked">Booked</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="startDate" className="form-label">
                            Start Date*
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            value={travelForm.startDate}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="endDate" className="form-label">
                            End Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            name="endDate"
                            value={travelForm.endDate}
                            onChange={handleFormChange}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="i.e. A short trip to Canada..."
                            value={travelForm.description}
                            onChange={handleFormChange}
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="col-12">
                        <label htmlFor="description" className="form-label">
                            To Do List
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="todoList"
                            name="todoList"
                            onKeyDown={handleAddTodo}
                            aria-describedby="add-todo-text"
                        />

                        <div className="form-text" id="add-todo-text">
                            Press enter to add a new to-do item.
                        </div>
                    </div>

                    <div className="col-12 d-flex gap-1">
                        {travelForm.todoList.map((todo, index) => (
                            <ToDo
                                key={index}
                                text={todo}
                                onRemove={() => handleRemoveTodo(index)}
                            />
                        ))}
                    </div>

                    <footer className="col-12 d-flex justify-content-between mt-5">
                        <Button
                            color="danger-custom"
                            onClick={navigateToTravels}
                        >
                            Cancel
                        </Button>
                        <div>
                            <Button
                                color="outline-danger me-2"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button type="submit">
                                {travelId ? "Update" : "Create"}
                            </Button>
                        </div>
                    </footer>
                </form>
            </section>

            {!travelId && (
                <section className="mt-5">
                    <CityDetails destination={travelForm.destination} />
                </section>
            )}

            <Alert message={alert.message} variant={alert.variant} />
        </div>
    );
}
