import React from "react";
import "./ReviewModal.css";
import { useNavigate } from "react-router-dom";

const ReviewModal = ({
                         fromAddress,
                         toAddress,
                         fromName,
                         toEmail,
                         toPhone,
                         packageType,
                         packageWeight,
                         packageSize,
                         additionalOptions,
                         paymentMethod,
                         estimatedPrice,
                         selectedDeliveryOption,
                         onConfirm,
                         onClose,
                     }) => {
    const navigate = useNavigate();

    const handleCancel = () => {
        if (onClose) onClose();
        navigate("/ship");
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Review Your Shipment</h2>
                <div className="review-section">
                    <p><strong>From:</strong> {fromAddress}</p>
                    <p><strong>To:</strong> {toAddress}</p>
                    <p><strong>Sender Name:</strong> {fromName}</p>
                    <p><strong>Recipient Email:</strong> {toEmail}</p>
                    <p><strong>Recipient Phone:</strong> {toPhone}</p>
                    <p><strong>Package Type:</strong> {packageType}</p>
                    <p><strong>Package Weight:</strong> {packageWeight} kg</p>
                    <p><strong>Package Size:</strong> {packageSize} cm³</p>
                    <p><strong>Additional Options:</strong></p>
                    <ul className="additional-options-list">
                        <li>Insurance: {additionalOptions.insurance ? "Yes" : "No"}</li>
                        <li>Signature: {additionalOptions.signature ? "Yes" : "No"}</li>
                        <li>Special Handling: {additionalOptions.specialHandling ? "Yes" : "No"}</li>
                    </ul>
                    <p><strong>Payment Method:</strong> {paymentMethod}</p>
                    <p><strong>Estimated Price:</strong> ${estimatedPrice}</p>
                    <p><strong>Delivery Option:</strong> {selectedDeliveryOption}</p>
                </div>
                <div className="modal-actions">
                    <button className="bigger-btn bigger-btn-danger" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="bigger-btn bigger-btn-primary" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
