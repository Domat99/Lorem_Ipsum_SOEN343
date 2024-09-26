import React, { useState } from 'react';
import './HomePage.css'; // Adjust this path as needed to match your file structure

function Homepage() {
    // State to track if the GIF should play
    const [playGif, setPlayGif] = useState(false);

    // Function to handle button click
    const handleLearnMoreClick = () => {
        setPlayGif(true); // Set the state to play the GIF
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="left-div">
                    {!playGif ? (
                        <img
                            src="/images/truck frozen image.png"
                            alt="Still of Cartoon Delivery Truck"
                            className="frozen-truck-image"
                            style={{ display: 'block', maxWidth: '100%' }}
                        />
                    ) : (
                        <img
                            src="https://cdn-icons-gif.flaticon.com/11614/11614810.gif"
                            alt="Cartoon Delivery Truck"
                            className="truck-image"
                            style={{ display: 'block', maxWidth: '100%' }} // Ensure it's responsive
                        />
                    )}
                </div>
                <div className="right-div">
                    <h1>
                        <span>Delivery</span> Service
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut
                        laoreet dolore magna aliquam erat volutpat.
                    </p>
                    <button className="learnMore-button" onClick={handleLearnMoreClick}>
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Homepage;