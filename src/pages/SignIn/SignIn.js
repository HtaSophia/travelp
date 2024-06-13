import './SingIn.css';
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/Logo.svg';
import Button from '../../components/shared/Button/Button';

export default function SingIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
    }

    return (
        <div className="auth-container">
            <div className="sign-in-container text-center">
                <img className="logo mb-5" src={logo} alt="TravelP logo with the Travel as blue text and P as green text"></img>

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

                    <Button text="Login" type="submit" />
                </form>

                <div className="register mt-4">
                    <span>Do not have an account?</span>
                    <NavLink className="navbar-brand" to="/sign-up">Register</NavLink>
                </div>
            </div>
        </div>
    )
}
