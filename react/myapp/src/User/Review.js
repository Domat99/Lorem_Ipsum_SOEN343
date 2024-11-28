import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {FaStar} from "react-icons/fa";
import './Review.css';

const Review = () => {
    const {state} = useLocation();
    const {deliveryId} = state || {};
    const navigate = useNavigate();

    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!deliveryId) {
            setMessage("No delivery ID found.");
        }
    }, [deliveryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = new URLSearchParams();
        reviewData.append("deliveryId", deliveryId);
        reviewData.append("rating", rating);
        reviewData.append("description", description);

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/reviews/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: reviewData.toString(),
            });

            const result = await response.text();
            console.log("Server response:", result);

            if (response.ok) {
                setShowModal(true);
            } else {
                alert(`Error: ${result}`);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setTimeout(() => {
            navigate(-1);
        }, 300);
    };

    return (
        <div className="review-page">
            <h1>Submit Your Review</h1>

            <form className="review-form" onSubmit={handleSubmit}>
                <div className="star-rating">
                    <p>Rate your experience:</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={40}
                            className={`star ${star <= (hoverRating || rating) ? "active" : ""}`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        />
                    ))}
                </div>

                <div className="comment-section">
                    <p>Leave a comment (optional):</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write your comment here..."
                        rows={5}
                    />
                </div>

                <div className="image-upload">
                    <p>Upload pictures (optional):</p>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                    />
                </div>

                <button type="submit" className="submit-button">
                    Submit Review
                </button>
            </form>

            {loading && (
                <div className="loading-indicator">
                    <p>Submitting your review...</p>
                    <div className="spinner"></div>
                </div>
            )}

            {showModal && (
                <div className="review-modal">
                    <div className="review-modal-content">
                        <h2>Thank you for your review!</h2>
                        <button onClick={handleModalClose} className="review-modal-button">Go Back</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Review;
