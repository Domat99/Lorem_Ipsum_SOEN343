import React from "react";
import Navbar from "./NavBar/NavBar";
import Footer from "./Footer/Footer"; // Import the Footer component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import Shipping from "./Shipping/Shipping";
// import Login from "./LogIn/LogIn";
// import Register from "./RegisterForm/Register";
import ScrollToTop from "./ScrollToTop";

function App() {
    return (
        <Router>
            <ScrollToTop /> {/* Add ScrollToTop here */}
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Ship" element={<Shipping />} />
                    {/*<Route path="/Login" element={<Login />} />*/}
                    {/*<Route path="/Register" element={<Register />} />*/}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
