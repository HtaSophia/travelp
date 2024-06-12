import React, { useState } from "react";
import './Singin.css';
import logo from '../../assets/images/Logo.svg';
import Button from '../shared/Button/Button';

export default function Singin() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(formData);
    }

    return (
        <div className="auth-container">
            <div className="sign-in-container">
                <img className="logo" src={logo} alt="TravelP logo with the Travel as blue text and P as green text"></img>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="input">
                        <label>Your email</label>
                        <input type="email" id="email" name="email" value={formData.name} onChange={handleChange} autoComplete="username" />
                    </div>

                    <div className="input">
                        <label>Your password</label>
                        <input type="password" id="password" name="password" value={formData.name} onChange={handleChange} autoComplete="current-password" />
                    </div>

                    <Button text="Login" type="submit" />
                </form>

                <div className="register">
                    <p>Dont have an account?<a href="#">Register</a></p>
                </div>
            </div>
        </div>
    )
}
