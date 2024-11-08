import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import HomePage from './HomePage/HomePage';
import Shipping from './Shipping/Shipping';
import Login from './LogIn/LogIn';
import Register from './RegisterForm/Register';
import ScrollToTop from "./ScrollToTop";
import './App.css'
import FAQ from "./InfoPages/FAQ";
// import Support from "./InfoPages/Support";
import Policy from "./InfoPages/Policy";
import ContactUs from "./InfoPages/ContactUs";



function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleLogin = (userData) => {
        setUser(userData);
        console.log('Logged in user:', userData);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <ScrollToTop/>
            <div className="App">
                <Navbar user={user} setUser={handleLogout}/>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/Ship" element={<Shipping/>}/>
                        <Route path="/Login" element={<Login handleLogin={handleLogin}/>}/>
                        <Route path="/Register" element={<Register/>}/>
                        <Route path="/FAQ" element={<FAQ/>}/>
                        {/*<Route path="/Support" element={<Support/>}/>*/}
                        <Route path="/Policy" element={<Policy/>}/>
                        <Route path="/ContactUs" element={<ContactUs/>}/>



                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
