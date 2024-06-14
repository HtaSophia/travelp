import './SignUp.css';
import logo from '../../assets/images/Logo.svg';
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoggedUser } from '../../auth/hooks/useLoggedUser.js';
import { useFirebase } from '../../firebase/useFirebase.js';

import Button from '../../components/shared/Button/Button.js';
import ErrorAlert from '../../components/shared/ErrorAlert/ErrorAlert.js';

export default function SignUp() {
    const navigate = useNavigate();
    const { userRegister } = useFirebase();
    useLoggedUser();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            await userRegister(formData.username, formData.email, formData.password);
            navigate("/travels");
        } catch (error) {
            console.error(error);
            setErrors({ general: error.message });
        }
    }

    const validateForm = ({ password, confirmPassword }) => {
        const errors = {};

        if ((password && confirmPassword) && (password !== confirmPassword)) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    return (
        <div className="auth-container">
            <div className="sign-in-container text-center">
                <img className="logo mb-4" src={logo} alt="TravelP logo with the Travel as blue text and P as green text" />

                <form className="form text-start" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            className="form-control"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            minLength={6}
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            minLength={6}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Confirm Password</label>
                        <input
                            className={`form-control ${errors.confirmPassword && "is-invalid"}`}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>

                    <Button text="Register" type="submit" />
                </form>

                <div className="register mt-4">
                    <span>Already have an account?</span>
                    <NavLink className="navbar-brand" to="/sign-in">Sign In</NavLink>
                </div>
            </div>

            <ErrorAlert variant="danger" error={errors.general} />
        </div>
    );
}
