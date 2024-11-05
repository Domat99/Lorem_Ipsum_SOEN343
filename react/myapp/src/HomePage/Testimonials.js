import React from 'react';
import './Testimonials.css';

const Testimonials = () => (
    <div className="testimonials-container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials">
            <div className="testimonial">
                <p>"Pigeon Express is incredibly reliable and fast. My package arrived even sooner than expected!"</p>
                <p>- Jane Doe</p>
            </div>
            <div className="testimonial">
                <p>"I love the transparency and ease of tracking. No hidden fees, just great service!"</p>
                <p>- John Smith</p>
            </div>
        </div>
    </div>
);

export default Testimonials;
