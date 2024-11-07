import React from 'react';
import './Modal.css'; // Optional: Create this file if you want custom styling for the modal

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
