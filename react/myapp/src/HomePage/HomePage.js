import React, { useState } from "react";
import "./HomePage.css";

const Home = () => {
    const [trackingNumber, setTrackingNumber] = useState("");

    const handleTrackingSubmit = () => {
        alert(`Tracking Number: ${trackingNumber}`);
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>
                    <span>Delivery</span> Service
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat.
                </p>

                <div className="tracking-form">
                    <input
                        type="text"
                        className="tracking-input"
                        placeholder="Tracking Number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                    <button className="tracking-button" onClick={handleTrackingSubmit}>
                        Track
                    </button>
                </div>
            </div>

            <div className="home-image">
                <img
                    src="https://d1jj76g3lut4fe.cloudfront.net/processed/images/PFI97OQ86i07mMP92T.png?Expires=1726608309&Signature=FfnMdamHOLpB62J-XEtiuAB8ajalGisRCTObetY0Lk4eS~gCBpnZptgmyPfzn2mnzMKcX3hV0Hx~CaNxkdrXHgtcHq5LBqSQLriD~D0o~jso~2i-H~r-p8aurS1ZipYUcadCwr8qqg-v8OmY3OElDLuoQ3xHVqYdbBaJY~iwjcufn7ArRLTuwa3FL4D6cwzOr~XTAZDYLHB0~tc0dZTQvQiaSxnfUgqVfQPCdr1gQI9Nykmc1va1cCw1xo70q6GFt-zSq9bQSzIdX3ljts6LSFRoEgsqovbcFJCzUwzeId8tm-jw4HiGq-HQDkC~l6TSroEMevTDzPFwBNqJAx6wQA__&Key-Pair-Id=K2YEDJLVZ3XRI"
                    alt="Delivery Truck"
                />
            </div>
        </div>
    );
};

export default Home;
