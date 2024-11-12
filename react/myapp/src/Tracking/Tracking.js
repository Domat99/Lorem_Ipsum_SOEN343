import React, { useState } from 'react';
import './Tracking.css';

const Tracking = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [shipmentInfo, setShipmentInfo] = useState(null);
    const [error, setError] = useState(null);

    const handleTrack = async () => {
        setError(null);
        setShipmentInfo(null);

        // Basic validation for tracking number format
        if (!/^[A-Za-z0-9]{10,20}$/.test(trackingNumber)) {
            setError('Invalid tracking number format.');
            return;
        }

        // Simulated API call (replace with real endpoint)
        const trackingUrl = `http://localhost:8080/track?trackingNumber=${trackingNumber}`;

        try {
            const response = await fetch(trackingUrl, { method: 'GET' });
            if (!response.ok) {
                throw new Error('Shipment not found.');
            }
            const data = await response.json();
            setShipmentInfo(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="tracking-container">
            <h2 className="tracking-title">Track Your Shipment</h2>
            <p>Enter your tracking number to get the latest update on your shipment.</p>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="tracking-input"
                />
            </div>
            <button onClick={handleTrack} className="tracking-btn">
                Track
            </button>
            {error && <p className="error-message">{error}</p>}
            {shipmentInfo && (
                <div className="shipment-info">
                    <h3>Shipment Information</h3>
                    <p>Status: {shipmentInfo.status}</p>
                    <p>Estimated Delivery: {shipmentInfo.estimatedDelivery}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default Tracking;
