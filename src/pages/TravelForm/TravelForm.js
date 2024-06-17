import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../firebase/useFirebase";

import ToDo from "../../components/ToDo/ToDo";
import Button from "../../components/shared/Button/Button";

export default function TravelForm() {
    const { travelId } = useParams();
    const { getTravel, createTravel, updateTravel } = useFirebase();

    const [travelForm, setTravelForm] = React.useState({});
    const [todos, setTodos] = React.useState([]);

    useEffect(() => {
        console.log(travelId);
        const handleGetTravel = async (travelId) => {
            try {
                const currentTravel = await getTravel(travelId);
                setTravelForm(currentTravel);
            } catch (error) {
                console.error(error.message);
            }
        };

        if (travelId) handleGetTravel(travelId);
    }, [getTravel, travelId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (travelId) {
            updateTravel({ ...data, id: travelId });
        } else {
            createTravel(data);
        }
    };

    const handleAddTodo = (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();

        const value = event.target.value;
        if (!value.trim()) return;

        setTodos([...todos, value]);
        event.target.value = "";
    };

    const handleRemoveTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="container py-5">
            <header className="text-center mb-5">
                <h1>Create a Travel Plan</h1>
            </header>
            <section>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="city" className="form-label">
                            City*
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={travelForm.city}
                            placeholder="1234 Main St"
                            required
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
                            value={travelForm.title}
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
                            value={travelForm.description}
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
                            value={travelForm.todo}
                            onKeyDown={handleAddTodo}
                            aria-describedby="add-todo-text"
                        />

                        <div className="form-text" id="add-todo-text">
                            Press enter to add a new to-do item.
                        </div>
                    </div>

                    <div className="col-12 d-flex gap-1">
                        {todos.map((todo, index) => (
                            <ToDo
                                key={index}
                                text={todo}
                                onRemove={() => handleRemoveTodo(index)}
                            />
                        ))}
                    </div>

                    <footer className="col-12 d-flex justify-content-between">
                        <Button color="danger-custom">Cancel</Button>
                        <Button type="submit">
                            {travelId ? "Update" : "Create"}
                        </Button>
                    </footer>
                </form>
            </section>
        </div>
    );
}
