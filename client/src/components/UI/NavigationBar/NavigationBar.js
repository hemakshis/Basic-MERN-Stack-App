import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationBar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">MERN App</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavBar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="myNavBar">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-2">
                        <NavLink exact to="/login" className="btn btn-outline-primary">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/signup" className="btn btn-primary">Signup</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default navigationBar;
