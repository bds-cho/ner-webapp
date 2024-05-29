import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {
    state = {  } 
    render() { 
        return (
            <nav className="navbar navbar-expand-lg custom-rounded-navbar">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                              Navbar Inhalt    
                            {/* <Link className="nav-link" to="/login">Login</Link> */}

                            </li>
                            <li className="nav-item">
                            {/* <Link className="nav-link" to="/new-account">New Account</Link> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;