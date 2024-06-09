import React from 'react';
import './Navbar.css';
import logo from '../../assets/images/Logo.svg';
import PropTypes from 'prop-types';

Navbar.propTypes = {
  username: PropTypes.string.isRequired, // name must be a string and is required
                  }
 function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg  bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"  ><span><img src={logo}></img></span></a>

                
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <a className="navbarimg" href="#"><img src='https://placehold.co/40x40'></img></a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {props.username}
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Log out</a></li>

                            </ul>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
        
    )
}

export default Navbar;