import React, { Component } from "react";
import { Link } from "react-router-dom";
import { menuNavbar } from "./MenuNavBar";
import "./NavBar.css";

class Navbar extends Component {
    state = { isMenuOpen: false, isDropdownOpen: false };

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    };

    toggleDropdown = () => {
        this.setState((prevState) => {
            if (!prevState.isDropdownOpen) {
                document.addEventListener("mousedown", this.handleClickOutside);
            } else {
                document.removeEventListener("mousedown", this.handleClickOutside);
            }
            return { isDropdownOpen: !prevState.isDropdownOpen };
        });
    };

    closeMenuOnLinkClick = () => {
        this.setState({ isMenuOpen: false });
    };

    handleClickOutside = (event) => {
        if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
            this.setState({ isDropdownOpen: false });
            document.removeEventListener("mousedown", this.handleClickOutside);
        }
    };

    onLogout = () => {
        const { setUser } = this.props;
        if (setUser) {
            setUser(null);
            this.setState({ isDropdownOpen: false });
            window.location.href = "/";
        }
    };

    render() {
        const { user } = this.props;

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
                    <li ref={(node) => { this.dropdownRef = node; }}>
                        {user ? (
                            <div
                                className={`navbarUser ${this.state.isDropdownOpen ? "active" : ""}`}
                                onClick={this.toggleDropdown}
                            >
                                <i className="fa-solid fa-user userIcon"></i>
                                <span>Welcome, <span className="userName">{user.name}</span></span>
                                {this.state.isDropdownOpen && (
                                    <div className="dropdownMenu">
                                        <Link to="/profile" className="dropdownItem">Profile</Link>
                                        <button onClick={this.onLogout} className="dropdownItem logoutButton">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/Login" className="navbarLinks" onClick={this.closeMenuOnLinkClick}>
                                Log in
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
