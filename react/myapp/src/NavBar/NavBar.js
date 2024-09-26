import { Component } from "react";
import { menuNavbar } from "./MenuNavBar";
import "./NavBar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = { clicked: false };

    render() {
        return (
            <nav className="navbarList">
                <a href="/">
                    <img className="logo" src="" alt=" "/> {/* Add a logo source */}
                </a>
                <ul className={this.state.clicked ? "navMenu active" : "navMenu"}>
                    {menuNavbar.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.url} className="navlinks"> {/* Ensure className is consistent */}
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