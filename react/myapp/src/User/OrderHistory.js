import React, { useState, useEffect } from 'react';

function Profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch order history if user data exists
        if (user) {
            fetchOrderHistory(user.id);
        }
    }, [user]);

    // Fetch delivery history from the backend
    const fetchOrderHistory = async (userId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/delivery/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch delivery history');
            }
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <h1>Order History</h1>

            {/* Order History Section */}
            <div className="order-history-section">
                <h2>Delivery History</h2>
                {loading && <p>Loading deliveries...</p>}
                {error && <p>{error}</p>}
                {orders.length > 0 ? (
                    <ul>
                        {orders.map((order) => (
                            <li key={order.id}>
                                <p><strong>Date:</strong> {order.deliveryDate}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                <p><strong>Tracking:</strong> {order.trackingNumber}</p>
                                <button className="track-button" onClick="/review">Review Your Order</button>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No deliveries found.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
