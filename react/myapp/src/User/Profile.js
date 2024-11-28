import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FaUser, FaHistory, FaStar, FaRegStar} from "react-icons/fa";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [reviews, setReviews] = useState({});

    useEffect(() => {
        if (user) {
            fetchOrderHistory(user.id);
        }
    }, [user]);

    useEffect(() => {
        if (orders.length > 0) {
            orders.forEach(order => {
                if (order.status === "DELIVERED" && !reviews[order.id]) {
                    fetchReviews(order.id);
                }
            });
        }
    }, [orders, reviews]);

    const fetchOrderHistory = async (userId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/delivery/user/${userId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch delivery history");
            }
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async (deliveryId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/reviews/get/${deliveryId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch reviews");
            }

            const data = await response.json();

            if (!data) {
                return;
            }

            setReviews(prevReviews => ({
                ...prevReviews,
                [deliveryId]: data
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const DELIVERY_STATUS = {
        PENDING: "Pending",
        SHIPPED: "Shipped",
        OUT_FOR_DELIVERY: "Out For Delivery",
        DELIVERED: "Delivered"
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="star filled"/>);
            } else {
                stars.push(<FaRegStar key={i} className="star empty"/>);
            }
        }
        return stars;
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>Welcome, {user ? user.name : "Guest"}!</h1>
            </header>

            <div className="profile-content">
                <div className="user-info">
                    <p><strong>Name:</strong> {user?.name || "N/A"}</p>
                    <p><strong>Email:</strong> {user?.email || "N/A"}</p>
                </div>

                <div className="navigation-section">
                    <div
                        className="nav-item"
                        onClick={() => setShowOrderHistory(!showOrderHistory)}
                    >
                        <FaHistory className="nav-icon"/>
                        <span>Order History</span>
                    </div>

                    {showOrderHistory && (
                        <div className={`order-history-section ${showOrderHistory ? "open" : ""}`}>
                            <h2>Delivery History</h2>
                            {loading && <p>Loading deliveries...</p>}
                            {error && <p>{error}</p>}
                            {orders.length > 0 ? (
                                <ul>
                                    {orders.map((order) => (
                                        <div className="package-content" key={order.id}>
                                            <li className="order-item">
                                                <p><strong>Tracking:</strong> {order.trackingNumber}</p>
                                                <p><strong>Expected Delivery Date:</strong> {order.deliveryDate}</p>
                                                <p><strong>Destination:</strong> {order.destinationAddress}</p>
                                                <p><strong>Price:</strong> {order.estimatedPrice.toFixed(2)} $
                                                </p>
                                                <p><strong>Delivery Option:</strong> {order.deliveryOption}</p>

                                                <p>
                                                    <strong>Status:</strong>
                                                    <span
                                                        className={`status ${order.status.toLowerCase().replace(/_/g, "-")}`}>
                                                            {DELIVERY_STATUS[order.status] || order.status}
                                                    </span>
                                                </p>

                                                {reviews[order.id] ? (
                                                    <div className="review-section">
                                                        <h3>Your Review for this Order:</h3>
                                                        <div className="stars">
                                                            <p>{renderStars(reviews[order.id].rating)}</p>
                                                        </div>
                                                        <p><strong>Comment:</strong> {reviews[order.id].description}</p>
                                                        <button
                                                            className="review_button"
                                                            disabled
                                                        >
                                                            Already Reviewed
                                                        </button>
                                                    </div>
                                                ) : (
                                                    order.status === "DELIVERED" && (
                                                        <button
                                                            className="review_button"
                                                            onClick={() => navigate(`/Review`, {state: {deliveryId: order.id}})}
                                                        >
                                                            Review This Order
                                                        </button>
                                                    )
                                                )}

                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <p>No deliveries found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
