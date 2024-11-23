import React, { useState } from 'react';
import './Support.css';

const Support = () => {
    const [activeTopic, setActiveTopic] = useState(null);

    const supportTopics = [
        {
            title: "Track Your Package",
            description: "Easily track your package using your tracking number.",
            steps: [
                "Go to the Home page.",
                "Enter your tracking number in the tracking section.",
                "Click 'Track' to see the current status of your package."
            ]
        },
        {
            title: "Change Delivery Address",
            description: "Need to update your delivery address? Follow these steps.",
            steps: [
                "Log in to your account.",
                "Navigate to the 'My Orders' section.",
                "Select the order and update the delivery address within 24 hours."
            ]
        },
        {
            title: "Report a Missing Package",
            description: "If your package hasn’t arrived, let us help you report it.",
            steps: [
                "Go to the 'My Orders' section.",
                "Locate the missing package and click 'Report Issue'.",
                "Fill in the form and submit a claim."
            ]
        },
        {
            title: "Return or Replace an Item",
            description: "Learn how to return or replace a damaged item.",
            steps: [
                "Navigate to the 'Returns' page.",
                "Select the item and follow the return instructions.",
                "Print the return label and ship the item back."
            ]
        },
        {
            title: "Account Settings",
            description: "Manage your account details and preferences easily.",
            steps: [
                "Log in to your account.",
                "Navigate to 'Settings' or 'Account Management'.",
                "Update your preferences and save changes."
            ]
        }
    ];

    const toggleTopic = (index) => {
        setActiveTopic(activeTopic === index ? null : index);
    };

    return (
        <div className="support-container">
            <h1>Support Center</h1>
            <p>Get personalized help and explore our step-by-step guides to resolve your issues quickly.</p>

            <div className="support-grid">
                {supportTopics.map((topic, index) => (
                    <div
                        key={index}
                        className={`support-card ${activeTopic === index ? 'active' : ''}`}
                        onClick={() => toggleTopic(index)}
                    >
                        <h2>{topic.title}</h2>
                        <p>{topic.description}</p>
                        {activeTopic === index && (
                            <div className="topic-steps">
                                <ol>
                                    {topic.steps.map((step, stepIndex) => (
                                        <li key={stepIndex}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Support;
