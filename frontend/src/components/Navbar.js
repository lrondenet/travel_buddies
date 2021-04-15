// import React, { Fragment } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import { Link, NavLink } from 'react-router-dom';

import './Navbar.css';

const navbar = () => {

    return (
        <nav className="navbar" id="navbar">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Travel Buddies</span>
                <button type="button" className="btn btn-primary btn-sm" to= "/login" id="button2">Login</button>
                <button type="button" className="btn btn-primary btn-sm" to="/register" id="button1">Signup</button> 
            </div>
        </nav>
    )
};

export default navbar;