import React, { useState } from 'react';
import './Tracking.css';

const Tracking = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [shipmentInfo, setShipmentInfo] = useState(null); // Initially null instead of an empty array
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isTracked, setIsTracked] = useState(false); // To track if tracking has been initiated

    const handleTrack = async () => {
        setError(null);
        setShipmentInfo(null);
        setLoading(true);
        setIsTracked(true); // Set tracked flag when user clicks track

        // Basic validation for tracking number format
        if (!/^[0-9]{1,20}$/.test(trackingNumber)) {
            setError('Invalid tracking number format.');
            setLoading(false);
            setIsTracked(false); // Reset tracked flag if invalid
            return;
        }

        // API call to getDeliveryStatus endpoint
        const trackingUrl = `http://localhost:8080/delivery/status?trackingNumber=${trackingNumber}`;

        try {
            const response = await fetch(trackingUrl, { method: 'GET' });
            if (!response.ok) {
                throw new Error('Shipment not found, please verify the tracking number and try again.');
            }
            const data = await response.json();
            setShipmentInfo(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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
            {loading && <p>Loading shipment information...</p>}
            {error && <p className="error-message">{error}</p>}
            {isTracked && shipmentInfo && (
                <div className="shipment-info">
                    <h3>Shipment Information for: <u>{shipmentInfo.trackingNumber}</u></h3>
                    <p><strong>Status:</strong> {shipmentInfo.status.replaceAll("_", " ")}</p> {/* This will now print OUT FOR DELIVERY without the underscores */}
                    <p><strong>Estimated Delivery Date:</strong> {shipmentInfo.deliveryDate}</p>
                </div>
            )}
        </div>
    );
};

export default Tracking;
