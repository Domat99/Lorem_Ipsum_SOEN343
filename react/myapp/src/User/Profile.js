import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css"

function Profile() {
    const navigate = useNavigate();

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>

            <div className="navigation-section">
                <div
                    className="nav-item"
                    onClick={() => navigate('/AccountInfo')}
                >
                    Account
                </div>

                <div
                    className="nav-item"
                    onClick={() => navigate('/OrderHistory')}
                >
                    Order History
                </div>
            </div>
        </div>
    );
}

export default Profile;
