import React, {useState} from 'react';
import './HeroSection.css';

const HeroSection = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleTrack = async () => {
        if (!trackingNumber) {
            setErrorMessage('Please enter a tracking number.');
            setTrackingResult(null);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/delivery/status?trackingNumber=${trackingNumber}`);

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Tracking number not found.');
                setTrackingResult(null);
                return;
            }

            const data = await response.json();
            setTrackingResult(data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching tracking details:', error);
            setErrorMessage('Unable to fetch tracking details. Please try again later.');
            setTrackingResult(null);
        }
    };

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
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                        <button className="track-button" onClick={handleTrack}>
                            Quick Track <span className="arrow"><i className="fa-solid fa-arrow-right"></i></span>
                        </button>
                    </div>

                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    {trackingResult && (
                        <div className="tracking-result">
                            <button className="close-button" onClick={() => setTrackingResult(null)}>
                                &times;
                            </button>
                            <h3>Tracking Details</h3>
                            <p><b>Status:</b> {trackingResult.status}</p>
                            <p><b>Estimated Delivery Date:</b> {trackingResult.deliveryDate}</p>
                        </div>
                    )}

                </div>
                <div className="hero-image">
                <img src="/images/DeliveryMan.png" alt="Delivery Illustration"/>
                </div>
            </div>

            <div className="values-container">
                <h2 className="values-header">Why Pigeon Express is the best deal.</h2>
                <p className="values-subheader">
                    Conveniently ship, pick up or drop off your packages and leave the rest for us to take care of.
                </p>

                <div className="values">
                    <div className="values-item">
                        <i className="fa-solid fa-comments-dollar"></i>
                        <p className="values-text">
                            <b>No Hidden Fees</b>
                            <br/>
                            Enjoy transparent pricing with no unexpected charges. What you see at checkout is exactly
                            what you pay - no additional shipping charges.
                        </p>
                    </div>
                    <div className="values-item">
                        <i className="fa-solid fa-truck-fast"></i>
                        <p className="values-text">
                            <b>Fast Shipping</b>
                            <br/>
                            Get your packages delivered quickly. With our shipping options, your items will reach their
                            destination in no time.
                        </p>
                    </div>
                    <div className="values-item">
                        <i className="fa-solid fa-hand-holding-heart"></i>
                        <p className="values-text">
                            <b>Security</b>
                            <br/>
                            Get extra peace of mind knowing we have advanced tracking and secure packaging to ensure
                            your items arrive in perfect condition.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HeroSection;