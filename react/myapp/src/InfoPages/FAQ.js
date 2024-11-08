import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleContactUsClick = () => {
        navigate('/contactus'); // Navigate to Contact Us page
    };

    const faqs = [
        {
            question: "How can I track my package?",
            answer: `You can track your package on the <a href='/'>Home</a> page using the tracking number provided in your order confirmation email, check our <a href='/Support'>Support</a> page for more details. `
        },
        {
            question: "What should I do if my package is delayed?",
            answer: `If your package is delayed, please check the tracking details for updates. <a href='/ContactUs'>Contact</a> our support team if the delay exceeds 3 days.`
        },
        {
            question: "Can I change the delivery address after placing an order?",
            answer: "Yes, you can change the delivery address within 24 hours of placing the order by <a href='/ContactUs'>contacting</a> our support team."
        },
        {
            question: "What delivery options do you offer?",
            answer: "We offer standard, express, and same-day delivery services. Delivery times vary based on your selected option and location."
        },
        {
            question: "How do I file a claim for a damaged or lost package?",
            answer: `To file a claim, <a href='/ContactUs'>contact</a> our support team within 7 days of delivery.`
        },
        {
            question: "Can I schedule a specific delivery time?",
            answer: "Yes, you can select a preferred delivery time during checkout."
        },
        {
            question: "What happens if I miss the delivery?",
            answer: "If you miss the delivery, our courier will leave a notice with further instructions. You can reschedule or pick it up at a nearby location."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we provide international shipping to over 150 countries. Shipping fees and delivery times vary by destination."
        },
        {
            question: "What is your return policy for damaged items?",
            answer: `You can initiate a return within 30 days of delivery. Please <a href='/ContactUs'>contact us</a> for more details and instructions.`
        }
    ];

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="faq-wrapper">
            <div className="faq-sidebar">
                <h1>Get Help Tailored to You</h1>
                <p><br />Sometimes, a little extra help can make all the difference.</p>
                <p>Contact us for personalized assistance with your questions.<br /></p>
                <button className="track-button" onClick={handleContactUsClick}>Contact Us</button>
            </div>

            <div className="faq-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Start typing question or key term..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="faq-search-bar"
                    />
                    <button className="search-icon">🔍</button>
                </div>
                <h1>Frequently Asked Questions</h1>
                <div>
                    {filteredFaqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h3
                                tabIndex={0}
                                onClick={() => toggleAnswer(index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        toggleAnswer(index);
                                    }
                                }}
                                className="faq-question"
                            >
                                {faq.question}
                                <span className="arrow">{activeIndex === index ? '▲' : '▼'}</span>
                            </h3>
                            <div
                                className={`faq-answer ${activeIndex === index ? 'show' : ''}`}
                                dangerouslySetInnerHTML={{__html: faq.answer}}
                                style={{
                                    maxHeight: activeIndex === index ? '100px' : '0px',
                                    overflow: 'hidden',
                                }}
                            ></div>
                        </div>
                    ))}
                    {filteredFaqs.length === 0 && <p>No questions found.</p>}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
