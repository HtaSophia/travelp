import React from "react";
import './Singin.css';
import logo from '../../assets/images/Logo.svg';
import signup from '../../assets/images/signup.jpg';
import Button from '../shared/Button/Button';

export default function Singin() {
    return (
        
        
        <div className="cotainer">
            
        <form  className="form" method="post">
            <img src={logo}></img>
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

        </div>
    )
}
        