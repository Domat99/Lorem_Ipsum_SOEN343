import React from 'react';
import './HeroSection.css';

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
                    <img src="/images/DeliveryMan.png" alt="Delivery Illustration" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
