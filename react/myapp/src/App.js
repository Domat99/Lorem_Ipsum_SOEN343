import React from "react";
import Navbar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import Shipping from "./Shipping/Shipping";
// import Login from "./LogIn/LogIn";
// import Register from "./RegisterForm/Register";
import ScrollToTop from "./ScrollToTop";
// import FAQ from "./InfoPages/FAQ";
import './App.css'


function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Navbar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/Ship" element={<Shipping />} />
                        {/*<Route path="/infopages/faq" element={<FAQ />} />*/}

                        {/*<Route path="/Login" element={<Login />} />*/}
                        {/*<Route path="/Register" element={<Register />} />*/}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
