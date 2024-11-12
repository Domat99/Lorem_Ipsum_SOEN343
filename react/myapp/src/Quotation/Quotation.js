import React, { useState } from 'react';
import './Quotation.css';

const Quotation = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [weight, setWeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');

    const handleGetQuote = () => {
        // Code to get the quote can be added here
        console.log({
            from,
            to,
            weight,
            length,
            width,
            height
        });
    };

    return (
        <div className="quotation-container">
            <h2 className="quotation-title">Get a Shipping Quote</h2>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="From*"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="To*"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="input-field"
                />
            </div>

            <h3 className="package-info-title">Package Information</h3>
            <div className="form-group package-info">
                <input
                    type="text"
                    placeholder="Weight*"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="input-field small-input"
                />
                <input
                    type="text"
                    placeholder="Length*"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="input-field small-input"
                />
                <input
                    type="text"
                    placeholder="Width*"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="input-field small-input"
                />
                <input
                    type="text"
                    placeholder="Height*"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="input-field small-input"
                />
            </div>

            <button onClick={handleGetQuote} className="quote-btn">
                Get Quotes
            </button>
        </div>
    );
};

export default Quotation;
