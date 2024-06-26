import "./SignIn.css";
import logo from "../../assets/images/Logo.svg";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebase/useFirebase.js";

import Button from "../../components/shared/Button/Button.js";
import Alert from "../../components/shared/Alert/Alert.js";

export default function SingIn() {
    const navigate = useNavigate();
    const { userLogin } = useFirebase();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await userLogin(formData.email, formData.password);
            navigate("/travels");
        } catch (error) {
            console.error(error.message);
            setErrors({ general: error.message });
        }
    };

    return (
        <div className="auth-container">
            <div className="sign-in-container text-center">
                <img
                    className="logo mb-5"
                    src={logo}
                    alt="TravelP logo with the Travel as blue text and P as green text"
                ></img>

                <form className="form text-start" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Your email</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Your password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <Button type="submit">Login</Button>
                </form>

                <div className="register mt-4">
                    <span>Do not have an account?</span>
                    <NavLink className="navbar-brand" to="/sign-up">
                        Register
                    </NavLink>
                </div>
            </div>

            <Alert variant="danger" message={errors.general} />
        </div>
    );
}
