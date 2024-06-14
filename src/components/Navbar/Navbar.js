import './Navbar.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Logo.svg';
import { useFirebase } from '../../firebase/useFirebase';

function Navbar() {
    const { userLogout, getUserName } = useFirebase();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const handleGetUserName = async () => {
            const currentUsername = await getUserName();
            setUsername(currentUsername);
        }

        handleGetUserName();
    });

    function handleLogOut() {
        userLogout();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><img src={logo}></img></NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="user-image"><img src='https://placehold.co/40x40'></img></div>
                                <span>{username}</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={handleLogOut}>Log out</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;
