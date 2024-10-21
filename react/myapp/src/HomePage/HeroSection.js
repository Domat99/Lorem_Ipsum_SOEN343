import React from 'react';
import './HeroSection.css'

const HeroSection = () => {
    return (
        <div className="hero-wrapper">
            <div className="hero-container">
                <div className="hero-content">
                    <h1>Track Your Package</h1>
                    <p className="HeroSubHeading">Real-time package tracking at your fingertips</p>
                    <div className="tracking-form">
                        <input
                            type="text"
                            className="tracking-input"
                            placeholder="Enter Tracking Number"
                        />
                        <button className="track-button">
                            Track <span className="arrow">→</span>
                        </button>
                    </div>
                    <p className="help-text">
                        Need help changing your delivery? <a href="#" className="help-link">Get Help</a>
                    </p>
                </div>
                <div className="hero-image">
                    <img src="/images/DeliveryMan.png" alt="Delivery Illustration"/>
                </div>
            </div>

            <div className="values-container">
                <h2 className="values-header">Why Pigeon Express is the best deal.</h2>
                <p className="values-subheader">Conveniently ship, pick up or drop off your packages and leave the rest
                    for us to take care of.</p>

                <div className="values">
                    <div className="values-item">
                        <i className="fa-solid fa-comments-dollar"></i>
                        <p className="values-text"><b>No Hidden Fees</b><br/>Enjoy transparent pricing with no
                            unexpected charges.
                            What you see at checkout is exactly what you pay- no additional shipping charges.</p>
                    </div>
                    <div className="values-item">
                        <i className="fa-solid fa-truck-fast"></i>
                        <p className="values-text"><b>Fast Shipping</b><br/>Get your packages delivered quickly.
                            With our shipping options, your items will reach their destination in no time.</p>
                    </div>
                    <div className="values-item">
                        <i className="fa-solid fa-hand-holding-heart"></i>
                        <p className="values-text"><b>Security</b><br/>Get extra peace of mind knowing we have
                            advanced tracking and secure packaging, to ensure your items arrive in perfect condition.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HeroSection;
