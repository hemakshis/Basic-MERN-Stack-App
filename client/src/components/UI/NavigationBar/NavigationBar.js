import React from 'react';
import {NavLink} from 'react-router-dom';
// import './NavigationBar.css';

const navigationBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">MERN App</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavBar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="myNavBar">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-2">
                        <NavLink exact to="/login" className="btn btn-outline-primary" activeClassName="btn btn-primary">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/signup" className="btn btn-primary" activeClassName="btn btn-outline-primary">Sign Up</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default navigationBar;
