import React, { Component } from "react";
import { menuNavbar } from "./MenuNavBar";
import "./NavBar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = { isMenuOpen: false };

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    };

    closeMenuOnLinkClick = () => {
        this.setState({ isMenuOpen: false });
    };

    render() {
        return (
            <nav className="navContainer">
                <a href="/">
                    <img className="logo" src="/images/logo.png" alt="logo" />
                </a>
                <div className="menuIcon" onClick={this.toggleMenu}>
                    <i className={this.state.isMenuOpen ? "fas fa-times animated-icon" : "fas fa-bars animated-icon"}></i>
                </div>
                <ul className={this.state.isMenuOpen ? "navMenu active" : "navMenu"}>
                    {menuNavbar.map((item, index) => (
                        <li key={index}>
                            <Link to={item.url} className={item.cName} onClick={this.closeMenuOnLinkClick}>
                                <i className={item.icon}></i>{item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default Navbar;
