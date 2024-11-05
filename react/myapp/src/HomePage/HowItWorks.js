import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => (
    <div className="how-it-works-container">
        <h2>How It Works</h2>
        <div className="steps">
            <div className="step">
                <i className="fa-solid fa-box"></i>
                <h3>1. Request Delivery</h3>
                <p>Provide your package details and request a delivery service.</p>
            </div>
            <div className="step">
                <i className="fa-solid fa-dollar-sign"></i>
                <h3>2. Get a Quote</h3>
                <p>Receive an instant quote for your delivery.</p>
            </div>
            <div className="step">
                <i className="fa-solid fa-truck"></i>
                <h3>3. Track Your Package</h3>
                <p>Stay updated with real-time tracking information.</p>
            </div>
            <div className="step">
                <i className="fa-solid fa-box-open"></i>
                <h3>4. Receive Your Package</h3>
                <p>Your package arrives at your doorstep safely and on time.</p>
            </div>
        </div>
    </div>
);

export default HowItWorks;
