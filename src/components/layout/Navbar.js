import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Navbar extends Component {
    render() {
        return (
            <nav className="teal lighten-1">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo right">MyCloud</a>
                    <ul id="nav-mobile" className="left">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        <li><Link to='/search'>Search</Link></li>
                        <li><Link to='/about'>About</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar
