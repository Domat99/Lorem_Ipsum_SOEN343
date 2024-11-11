import React, {useEffect, useRef, useState} from 'react';
import "./ShippingStyle.css";
import GoogleMapsService from '../GoogleMaps/GoogleMapsService';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const googleMapsService = new GoogleMapsService(apiKey);

const Shipping = () => {
    const shipFromRef = useRef(null);
    const shipToRef = useRef(null);
    const packageInfoRef = useRef(null);
    const shippingServiceRef = useRef(null);
    const additionalOptionsRef = useRef(null);
    const paymentRef = useRef(null);

    const [activeSection, setActiveSection] = useState(null);
    const [distance, setDistance] = useState(null);

    // State for "Ship From" section
    const [fromCountry, setFromCountry] = useState('Canada');
    const [fromAddress, setFromAddress] = useState('');
    const [fromName, setFromName] = useState('');
    const [fromContact, setFromContact] = useState('');
    const [fromCity, setFromCity] = useState('');
    const [fromProvince, setFromProvince] = useState('');
    const [fromPostalCode, setFromPostalCode] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [fromPhone, setFromPhone] = useState('');
    const [fromExtension, setFromExtension] = useState('');

    // State for "Ship To" section
    const [toCountry, setToCountry] = useState('Canada');
    const [toAddress, setToAddress] = useState('');
    const [toName, setToName] = useState('');
    const [toContact, setToContact] = useState('');
    const [toCity, setToCity] = useState('');
    const [toProvince, setToProvince] = useState('');
    const [toPostalCode, setToPostalCode] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [toPhone, setToPhone] = useState('');
    const [toExtension, setToExtension] = useState('');

    const [packageType, setPackageType] = useState('My Packaging');
    const [packageWeight, setPackageWeight] = useState('');
    const [packageLength, setPackageLength] = useState('');
    const [packageWidth, setPackageWidth] = useState('');
    const [packageHeight, setPackageHeight] = useState('');
    const [packageValue, setPackageValue] = useState('');


    useEffect(() => {
        googleMapsService.loadGoogleMapsScript();
    }, []);

    const toggleSection = (section) => {
        const sectionRef = {
            shipFrom: shipFromRef,
            shipTo: shipToRef,
            packageInfo: packageInfoRef,
            shippingService: shippingServiceRef,
            additionalOptions: additionalOptionsRef,
            payment: paymentRef
        }[section];

        if (sectionRef && sectionRef.current && activeSection !== section) {
            setActiveSection(section);


            setTimeout(() => {
                const yOffset = -100;
                const yPosition = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({top: yPosition, behavior: 'smooth'});
            }, 100);
        } else {
            setActiveSection(null);
        }
    };


    const handleAutocomplete = (inputElement, setAddress) => {
        googleMapsService.initAutocomplete(inputElement, (place) => {
            setAddress(place.formatted_address);
        });
    };

    const calculateDistance = (e) => {
        e.preventDefault();
        if (fromAddress && toAddress) {
            googleMapsService.calculateDistance(fromAddress, toAddress, (distance) => {
                setDistance(distance);
            });
        } else {
            alert("Please enter both 'From' and 'To' addresses.");
        }
    };


    return (
        <div className="shipping-page">
            <h1>Create a Shipment</h1>
            <div className="accordion">
                <div ref={shipFromRef} className={`accordion-item ${activeSection === 'shipFrom' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('shipFrom')}>
                        <h3>Ship From *</h3>
                        <i className={`fas ${activeSection === 'shipFrom' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'shipFrom' && (
                        <div className="accordion-content">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="fromCountry">Country or Territory *</label>
                                    <select id="fromCountry" value={fromCountry}
                                            onChange={(e) => setFromCountry(e.target.value)}>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromAddress1">Address Line 1 *</label>
                                    <input
                                        type="text"
                                        id="fromAddress1"
                                        name="fromAddress1"
                                        value={fromAddress}
                                        onChange={(e) => setFromAddress(e.target.value)}
                                        onFocus={(e) => handleAutocomplete(e.target, setFromAddress)}
                                        required
                                    />
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="fromName">Full Name or Company Name *</label>
                                        <input
                                            type="text"
                                            id="fromName"
                                            name="fromName"
                                            value={fromName}
                                            onChange={(e) => setFromName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fromContact">Contact Name</label>
                                        <input
                                            type="text"
                                            id="fromContact"
                                            name="fromContact"
                                            value={fromContact}
                                            onChange={(e) => setFromContact(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromCity">City *</label>
                                    <input
                                        type="text"
                                        id="fromCity"
                                        name="fromCity"
                                        value={fromCity}
                                        onChange={(e) => setFromCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromProvince">Province *</label>
                                    <select
                                        id="fromProvince"
                                        name="fromProvince"
                                        value={fromProvince}
                                        onChange={(e) => setFromProvince(e.target.value)}
                                        required
                                    >
                                        <option value="">Select One</option>
                                        <option value="Ontario">Ontario</option>
                                        <option value="Quebec">Quebec</option>
                                        <option value="Alberta">Alberta</option>
                                        <option value="British Columbia">British Columbia</option>
                                        <option value="Manitoba">Manitoba</option>
                                        <option value="New Brunswick">New Brunswick</option>
                                        <option value="Nova Scotia">Nova Scotia</option>
                                        <option value="Nunavut">Nunavut</option>
                                        <option value="Saskatchewan">Saskatchewan</option>
                                        <option value="Yukon">Yukon</option>
                                        <option value="Northwest Territories">Northwest Territories</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromPostalCode">Postal Code *</label>
                                    <input
                                        type="text"
                                        id="fromPostalCode"
                                        name="fromPostalCode"
                                        value={fromPostalCode}
                                        onChange={(e) => setFromPostalCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromEmail">Email *</label>
                                    <input
                                        type="email"
                                        id="fromEmail"
                                        name="fromEmail"
                                        value={fromEmail}
                                        onChange={(e) => setFromEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromPhone">Phone *</label>
                                    <input
                                        type="text"
                                        id="fromPhone"
                                        name="fromPhone"
                                        value={fromPhone}
                                        onChange={(e) => setFromPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromExtension">Extension</label>
                                    <input
                                        type="text"
                                        id="fromExtension"
                                        name="fromExtension"
                                        value={fromExtension}
                                        onChange={(e) => setFromExtension(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div ref={shipToRef} className={`accordion-item ${activeSection === 'shipTo' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('shipTo')}>
                        <h3>Ship To *</h3>
                        <i className={`fas ${activeSection === 'shipTo' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'shipTo' && (
                        <div className="accordion-content">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="toCountry">Country or Territory *</label>
                                    <select id="toCountry" value={toCountry}
                                            onChange={(e) => setToCountry(e.target.value)}>
                                        <option value="Canada">Canada</option>
                                        <option value="USA">USA</option>
                                        <option value="Argentina">Argentina</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="toAddress">Address Line 1 *</label>
                                    <input
                                        type="text"
                                        id="toAddress"
                                        name="toAddress"
                                        value={toAddress}
                                        onChange={(e) => setToAddress(e.target.value)}
                                        onFocus={(e) => handleAutocomplete(e.target, setToAddress)} // Added for Autocomplete
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="toCity">City *</label>
                                    <input
                                        type="text"
                                        id="toCity"
                                        name="toCity"
                                        value={toCity}
                                        onChange={(e) => setToCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="toProvince">Province/State *</label>
                                    <input
                                        type="text"
                                        id="toProvince"
                                        name="toProvince"
                                        value={toProvince}
                                        onChange={(e) => setToProvince(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="toPostalCode">Postal Code *</label>
                                    <input
                                        type="text"
                                        id="toPostalCode"
                                        name="toPostalCode"
                                        value={toPostalCode}
                                        onChange={(e) => setToPostalCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="toEmail">Recipient Email *</label>
                                    <input
                                        type="email"
                                        id="toEmail"
                                        name="toEmail"
                                        value={toEmail}
                                        onChange={(e) => setToEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="toPhone">Recipient Phone *</label>
                                    <input
                                        type="text"
                                        id="toPhone"
                                        name="toPhone"
                                        value={toPhone}
                                        onChange={(e) => setToPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <div ref={packageInfoRef}
                     className={`accordion-item ${activeSection === 'packageInfo' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('packageInfo')}>
                        <h3>Package Information *</h3>
                        <i className={`fas ${activeSection === 'packageInfo' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'packageInfo' && (
                        <div className="accordion-content">
                            <form>
                                <h3>Package 1</h3>
                                <div className="form-group">
                                    <label htmlFor="packageType">Packaging Type *</label>
                                    <select
                                        id="packageType"
                                        name="packageType"
                                        value={packageType}
                                        onChange={(e) => setPackageType(e.target.value)}
                                        required
                                    >
                                        <option value="My Packaging">My Packaging</option>
                                        <option value="Carrier Packaging">Carrier Packaging</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="packageWeight">Weight per Package (kg) *</label>
                                    <input
                                        type="number"
                                        id="packageWeight"
                                        name="packageWeight"
                                        value={packageWeight}
                                        onChange={(e) => setPackageWeight(e.target.value)}
                                        min="0" required
                                    />
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="packageLength">Length (cm)</label>
                                        <input
                                            type="number"
                                            id="packageLength"
                                            name="packageLength"
                                            value={packageLength}
                                            onChange={(e) => setPackageLength(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="packageWidth">Width (cm)</label>
                                        <input
                                            type="number"
                                            id="packageWidth"
                                            name="packageWidth"
                                            value={packageWidth}
                                            onChange={(e) => setPackageWidth(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="packageHeight">Height (cm)</label>
                                        <input
                                            type="number"
                                            id="packageHeight"
                                            name="packageHeight"
                                            value={packageHeight}
                                            onChange={(e) => setPackageHeight(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="ship-tip">
                                    <p>Ship Tip: Package weight and dimensions directly impact your cost.</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="packageValue">Total Package Value (CAD)</label>
                                    <input
                                        type="number"
                                        id="packageValue"
                                        name="packageValue"
                                        value={packageValue}
                                        onChange={(e) => setPackageValue(e.target.value)}
                                        placeholder="Enter value in CAD"
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <div ref={shippingServiceRef}
                     className={`accordion-item ${activeSection === 'shippingService' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('shippingService')}>
                        <h3>Shipping Service *</h3>
                        <i className={`fas ${activeSection === 'shippingService' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'shippingService' && (
                        <div className="accordion-content">
                            <p>Form content for 'Shipping Service' section goes here...</p>
                        </div>
                    )}
                </div>

                <div ref={additionalOptionsRef}
                     className={`accordion-item ${activeSection === 'additionalOptions' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('additionalOptions')}>
                        <h3>Additional Options</h3>
                        <i className={`fas ${activeSection === 'additionalOptions' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'additionalOptions' && (
                        <div className="accordion-content">
                            <p>Form content for 'Additional Options' section goes here...</p>
                        </div>
                    )}
                </div>

                <div ref={paymentRef} className={`accordion-item ${activeSection === 'payment' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('payment')}>
                        <h3>Payment *</h3>
                        <i className={`fas ${activeSection === 'payment' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'payment' && (
                        <div className="accordion-content">
                            <p>Form content for 'Payment' section goes here...</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="terms">
                <label>
                    <input type="checkbox"/> I agree to the <a href="#">Terms and Conditions</a>
                </label>
            </div>

            <div className="form-actions">
                <button className="btn btn-secondary">Cancel Shipment</button>
                <button className="btn btn-primary">Review and Continue</button>
            </div>
        </div>
    )
        ;
};

export default Shipping;
