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
            <h1>Profile Page</h1>

            {user && (
                <div className="account-section">
                    <h2>Account</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}


        </div>
    );
}

export default Profile;
