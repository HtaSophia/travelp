import React from "react";
import './Singin.css';
import Button from '../shared/Button/Button';

export default function Singin() {
    return (
        
        <form method="post">
            <div className="email">
            <input type="text"></input>
            <label>Your email</label>
            </div>

            <div className="password">
            <input type="password"></input>
            <label>Your password</label>
            </div>

            <Button text="Login" color="#2D527C" onClick={() => console.log('Form submitted')} />

            <div className="register">
                <p>Dont have an account?<a href="#">Register</a></p>

            </div>

        </form>
    )
}
        