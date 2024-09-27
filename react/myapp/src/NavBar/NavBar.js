import React, { Component } from "react";
import { menuNavbar } from "./MenuNavBar";
import "./NavBar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    render() {
        return (
            <nav className="navbarList">
                <a href="/">
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                </a>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? "navMenu active" : "navMenu"}>
                    {menuNavbar.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.url} className="navlinks">
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navbar;
