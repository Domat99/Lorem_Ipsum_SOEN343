import React, { useState, useEffect } from 'react';
import "./ShippingStyle.css";
import GoogleMapsService from '../GoogleMaps/GoogleMapsService'; // Assuming the GoogleMapsService class is in this directory

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Load API key from environment
const googleMapsService = new GoogleMapsService(apiKey); // Create an instance of the GoogleMapsService class

const Shipping = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [distance, setDistance] = useState(null);

    // State to hold form input values
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');

    useEffect(() => {
        // Load the Google Maps script when the component mounts
        googleMapsService.loadGoogleMapsScript();
    }, []);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    // Function to initialize Google Maps Autocomplete for a given input field
    const handleAutocomplete = (inputElement, setValue) => {
        googleMapsService.initAutocomplete(inputElement, (place) => {
            setValue(place.formatted_address);
        });
    };

    // Function to calculate the distance between "Ship From" and "Ship To" addresses
    const calculateDistance = (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        googleMapsService.calculateDistance(fromAddress, toAddress, (distance) => {
            setDistance(distance);
        });
    };

    return (
        <div className="shipping-page">
            <h1>Create a Shipment</h1>
            <div className="accordion">
                <div className={`accordion-item ${activeSection === 'shipFrom' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('shipFrom')}>
                        <h3>Ship From *</h3>
                        <i className={`fas ${activeSection === 'shipFrom' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'shipFrom' && (
                        <div className="accordion-content">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="fromCountry">Country or Territory *</label>
                                    <select id="fromCountry" name="fromCountry">
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>

                                {/* Address Line 1 with Autocomplete */}
                                <div className="form-group">
                                    <label htmlFor="fromAddress1">Address Line 1 *</label>
                                    <input
                                        type="text"
                                        id="fromAddress1"
                                        name="fromAddress1"
                                        value={fromAddress} // Controlled input
                                        onChange={(e) => setFromAddress(e.target.value)}
                                        required
                                        onFocus={(e) => handleAutocomplete(e.target, setFromAddress)} // Trigger autocomplete
                                    />
                                </div>


                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="fromName">Full Name or Company Name *</label>
                                        <input type="text" id="fromName" name="fromName" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fromContact">Contact Name</label>
                                        <input type="text" id="fromContact" name="fromContact"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromAddress1">Address Line 1 *</label>
                                    <input type="text" id="fromAddress1" name="fromAddress1" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fromAddress2">Address Line 2</label>
                                    <input type="text" id="fromAddress2" name="fromAddress2"/>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="fromCity">City *</label>
                                        <input type="text" id="fromCity" name="fromCity" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fromProvince">Province *</label>
                                        <select id="fromProvince" name="fromProvince" required>
                                            <option value="">Select One</option>
                                            <option value="Ontario">Ontario</option>
                                            <option value="Quebec">Quebec</option>
                                            <option value="Alberta">Alberta</option>
                                            <option value="British Columbia">British Columbia</option>
                                            <option value="Manitoba">Manitoba</option>
                                            <option value="New Brunswick">New Brunswick</option>
                                            <option value="Manitoba">Manitoba</option>
                                            <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                            <option value="Nova Scotia">Nova Scotia</option>
                                            <option value="Nunavut">Nunavut</option>
                                            <option value="Saskatchewan">Saskatchewan</option>
                                            <option value="Yukon">Yukon</option>
                                            <option value="Northwest Territories">Northwest Territories</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fromPostalCode">Postal Code *</label>
                                        <input type="text" id="fromPostalCode" name="fromPostalCode" required/>
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="fromEmail">Email *</label>
                                        <input type="email" id="fromEmail" name="fromEmail" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fromPhone">Phone *</label>
                                        <input type="text" id="fromPhone" name="fromPhone" required/>
                                        <span className="error-message">Phone is required.</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fromExtension">Extension</label>
                                        <input type="text" id="fromExtension" name="fromExtension"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className={`accordion-item ${activeSection === 'shipTo' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('shipTo')}>
                        <h3>Ship To *</h3>
                        <i className={`fas ${activeSection === 'shipTo' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'shipTo' && (
                        <div className="accordion-content">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="toCountry">Country or Territory *</label>
                                    <select id="toCountry" name="toCountry">
                                        <option value="Canada">Canada</option>
                                        <option value="USA">USA</option>
                                        <option value="Argentina">Argentina</option>
                                    </select>
                                </div>

                                {/* Address Line 1 with Autocomplete */}
                                <div className="form-group">
                                    <label htmlFor="toAddress">Address Line 1 *</label>
                                    <input
                                        type="text"
                                        id="toAddress"
                                        name="toAddress"
                                        value={toAddress}
                                        onChange={(e) => setToAddress(e.target.value)}
                                        onFocus={(e) => handleAutocomplete(e.target, setToAddress)}
                                        required

                                    />
                                </div>


                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="toName">Full Name or Company Name *</label>
                                        <input type="text" id="toName" name="toName" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="toContact">Contact Name *</label>
                                        <input type="text" id="toContact" name="toContact" required/>
                                        <span className="error-message">Contact Name is required.</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="toAddress">Address Line 1 *</label>
                                    <input type="text" id="toAddress" name="toAddress" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="toAddress2">Address Line 2</label>
                                    <input type="text" id="toAddress2" name="toAddress2"/>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="toPostalCode">Postal Code *</label>
                                        <input type="text" id="toPostalCode" name="toPostalCode" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City *</label>
                                        <input type="text" id="city" name="city" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="province">Province/State *</label>
                                        <input type="text" id="province" name="province"/>
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="toEmail">Recipient Email *</label>
                                        <input type="email" id="toEmail" name="toEmail" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="toPhone">Recipient Phone *</label>
                                        <input type="text" id="toPhone" name="toPhone" required/>
                                        <span className="error-message">Recipient Phone is required.</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="toExtension">Extension</label>
                                        <input type="text" id="toExtension" name="toExtension"/>
                                    </div>
                                </div>

                                {/* Calculate Distance Button */}
                                <div className="form-actions">
                                    <button className="btn btn-primary" onClick={calculateDistance}>Calculate Distance</button>
                                </div>

                                {/* Display Distance */}
                                {distance && <p>Distance: {distance}</p>}

                            </form>
                        </div>
                    )}
                </div>

                <div className={`accordion-item ${activeSection === 'packageInfo' ? 'active' : ''}`}>
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
                                    <select id="packageType" name="packageType" required>
                                        <option value="My Packaging">My Packaging</option>
                                        <option value="Carrier Packaging">Carrier Packaging</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="packageWeight">Weight per Package (kg) *</label>
                                    <input type="number" id="packageWeight" name="packageWeight" required/>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group">
                                        <label htmlFor="packageLength">Length (cm)</label>
                                        <input type="number" id="packageLength" name="packageLength"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="packageWidth">Width (cm)</label>
                                        <input type="number" id="packageWidth" name="packageWidth"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="packageHeight">Height (cm)</label>
                                        <input type="number" id="packageHeight" name="packageHeight"/>
                                    </div>
                                </div>
                                <div className="ship-tip">
                                    <p>Ship Tip: Package weight and dimensions directly impact your cost.</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="packageValue">Total Package Value (CAD)</label>
                                    <input type="number" id="packageValue" name="packageValue"
                                           placeholder="Enter value in CAD"/>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className={`accordion-item ${activeSection === 'shippingService' ? 'active' : ''}`}>
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

                <div className={`accordion-item ${activeSection === 'additionalOptions' ? 'active' : ''}`}>
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

                <div className={`accordion-item ${activeSection === 'payment' ? 'active' : ''}`}>
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
    );
};

export default Shipping;
