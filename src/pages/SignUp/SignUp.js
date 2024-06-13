import './SingUp.css';
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/Logo.svg';
import Button from '../shared/Button/Button';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        // Clear previous error message when user starts typing
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform validation
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Handle successful form submission
            console.log(formData);
            // Reset form data (if needed)
            // setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        }
    };

    const validateForm = ({ password, confirmPassword }) => {
        const errors = {};

        if (password && password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        if ((password && confirmPassword) && (password !== confirmPassword)) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    return (
        <div className="auth-container">
            <div className="sign-in-container text-center">
                <img className="logo mb-5" src={logo} alt="TravelP logo with the Travel as blue text and P as green text" />

                <form className="form text-start" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            className={`form-control ${formErrors.username && "is-invalid"}`}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                            required
                        />
                        {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            className={`form-control ${formErrors.email && "is-invalid"}`}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            className={`form-control ${formErrors.password && "is-invalid"}`}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />
                        {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Confirm Password</label>
                        <input
                            className={`form-control ${formErrors.confirmPassword && "is-invalid"}`}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />
                        {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
                    </div>

                    <Button text="Register" type="submit" />
                </form>

                <div className="register mt-4">
                    <span>Already have an account?</span>
                    <NavLink className="navbar-brand" to="/sign-in">Sign In</NavLink>
                </div>
            </div>
        </div>
    );
}
