import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [images, setImages] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted", { name, email, subject, message, images });
        alert("Thank you for contacting us! We'll get back to you shortly.");
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    return (
        <div className="contact-us-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        placeholder="Enter the subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        placeholder="Describe your concern in detail"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="images">Attach Images (optional)</label>
                    <input
                        type="file"
                        id="images"
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple
                    />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default ContactUs;
