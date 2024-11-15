import React, {useEffect, useRef, useState} from 'react';
import "./ShippingStyle.css";
import GoogleMapsService from '../GoogleMaps/GoogleMapsService';
import ShippingService from "./ShippingService";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const googleMapsService = new GoogleMapsService(apiKey);
const shippingService = new ShippingService();

const Shipping = () => {
    const shipFromRef = useRef(null);
    const shipToRef = useRef(null);
    const packageInfoRef = useRef(null);
    const shippingServiceRef = useRef(null);
    const additionalOptionsRef = useRef(null);
    const paymentRef = useRef(null);
    const [paymentMethod, setPaymentMethod] = useState('');

    const [activeSection, setActiveSection] = useState(sessionStorage.getItem('activeSection') || null);
    const [distance, setDistance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [fromAddress, setFromAddress] = useState(sessionStorage.getItem('fromAddress') || '');
    const [fromName, setFromName] = useState(sessionStorage.getItem('fromName') || '');
    const [fromContact, setFromContact] = useState(sessionStorage.getItem('fromContact') || '');
    const [fromEmail, setFromEmail] = useState(sessionStorage.getItem('fromEmail') || '');
    const [fromPhone, setFromPhone] = useState(sessionStorage.getItem('fromPhone') || '');
    const [fromExtension, setFromExtension] = useState(sessionStorage.getItem('fromExtension') || '');

    const [toAddress, setToAddress] = useState(sessionStorage.getItem('toAddress') || '');
    const [toEmail, setToEmail] = useState(sessionStorage.getItem('toEmail') || '');
    const [toPhone, setToPhone] = useState(sessionStorage.getItem('toPhone') || '');
    const [toExtension, setToExtension] = useState(sessionStorage.getItem('toExtension') || '');

    const [packageType, setPackageType] = useState(sessionStorage.getItem('packageType') || 'My Packaging');
    const [packageWeight, setPackageWeight] = useState(sessionStorage.getItem('packageWeight') || '');
    const [packageLength, setPackageLength] = useState(sessionStorage.getItem('packageLength') || '');
    const [packageWidth, setPackageWidth] = useState(sessionStorage.getItem('packageWidth') || '');
    const [packageHeight, setPackageHeight] = useState(sessionStorage.getItem('packageHeight') || '');
    const [packageValue, setPackageValue] = useState(sessionStorage.getItem('packageValue') || '');
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState(null);

    const packageSize = packageLength && packageWidth && packageHeight
        ? packageLength * packageWidth * packageHeight
        : null;

    const [additionalOptions, setAdditionalOptions] = useState({
        insurance: false,
        signature: false,
        specialHandling: false,
    });

    const handleAdditionalOptionChange = (event, option) => {
        setAdditionalOptions((prevOptions) => ({
            ...prevOptions,
            [option]: event.target.checked,
        }));
    };


    useEffect(() => {
        googleMapsService.loadGoogleMapsScript();
    }, []);

    useEffect(() => {
        sessionStorage.setItem('fromAddress', fromAddress);
        sessionStorage.setItem('fromName', fromName);
        sessionStorage.setItem('fromContact', fromContact);
        sessionStorage.setItem('fromEmail', fromEmail);
        sessionStorage.setItem('fromPhone', fromPhone);
        sessionStorage.setItem('fromExtension', fromExtension);

        sessionStorage.setItem('toAddress', toAddress);
        sessionStorage.setItem('toEmail', toEmail);
        sessionStorage.setItem('toPhone', toPhone);
        sessionStorage.setItem('toExtension', toExtension);

        sessionStorage.setItem('packageType', packageType);
        sessionStorage.setItem('packageWeight', packageWeight);
        sessionStorage.setItem('packageLength', packageLength);
        sessionStorage.setItem('packageWidth', packageWidth);
        sessionStorage.setItem('packageHeight', packageHeight);
        sessionStorage.setItem('packageValue', packageValue);

        sessionStorage.setItem('activeSection', activeSection);
    }, [
        fromAddress, fromName, fromContact, fromEmail, fromPhone, fromExtension,
        toAddress, toEmail, toPhone, toExtension,
        packageType, packageWeight, packageLength, packageWidth, packageHeight, packageValue,
        activeSection
    ]);

    const calculateDistance = () => {
        return new Promise((resolve, reject) => {
            if (fromAddress && toAddress) {
                googleMapsService.calculateDistance(fromAddress, toAddress, (distance) => {
                    if (distance !== null) {
                        const numericDistance = parseFloat(distance.replace(/[^0-9.]/g, ''));
                        setDistance(numericDistance);
                        resolve(numericDistance);
                    } else {
                        setErrorMessage("Failed to calculate distance. Please try again.");
                        reject(new Error("Failed to calculate distance"));
                    }
                });
            } else {
                setErrorMessage("Please enter both 'From' and 'To' addresses.");
                reject(new Error("Addresses not provided"));
            }
        });
    };


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

    const calculatePrice = async () => {
        setErrorMessage(null);

        if (!selectedDeliveryOption) {
            alert("Please select a delivery option.");
            return;
        }
        if (!packageWeight) {
            alert("Please enter the package weight.");
            return;
        }
        if (!packageSize) {
            alert("Please enter valid dimensions for the package.");
            return;
        }

        try {
            const calculatedDistance = distance || await calculateDistance();

            console.log("Distance:", calculatedDistance);
            console.log("Package Weight:", packageWeight);
            console.log("Package Size:", packageSize);
            console.log("Selected Delivery Option:", selectedDeliveryOption);

            if (calculatedDistance) {
                let basePrice = await shippingService.estimatePrice(
                    calculatedDistance,
                    packageWeight,
                    packageSize,
                    selectedDeliveryOption
                );

                if (additionalOptions.insurance) basePrice += 10;
                if (additionalOptions.signature) basePrice += 2;
                if (additionalOptions.specialHandling) basePrice += 7;

                setEstimatedPrice(basePrice.toFixed(2));

                console.log("Estimated Price with Modifiers:", basePrice.toFixed(2));
            } else {
                setErrorMessage("Distance calculation failed. Please check the addresses.");
            }
        } catch (error) {
            setErrorMessage("Failed to calculate price. Please try again.");
            console.error("Failed to calculate price:", error);
        }
    };

    const handleAutocomplete = (inputElement, setAddress) => {
        googleMapsService.initAutocomplete(inputElement, (place) => {
            setAddress(place.formatted_address);
        });
    };


    return (
        <div className="shipping-page">
            <h1>Create a Shipment</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                                <div className="form-group">
                                    <label htmlFor="toExtension">Extension</label>
                                    <input
                                        type="text"
                                        id="toExtension"
                                        name="toExtension"
                                        value={toExtension}
                                        onChange={(e) => setToExtension(e.target.value)}
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
                                        min="0.1"
                                        max="20"
                                        required
                                    />
                                    <small>Minimum: 0.1 kg, Maximum: 20 kg</small>
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
                                            min="5"
                                            max="100"
                                        />
                                        <small>Min: 5 cm, Max: 100 cm</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="packageWidth">Width (cm)</label>
                                        <input
                                            type="number"
                                            id="packageWidth"
                                            name="packageWidth"
                                            value={packageWidth}
                                            onChange={(e) => setPackageWidth(e.target.value)}
                                            min="5"
                                            max="100"
                                        />
                                        <small>Min: 5 cm, Max: 100 cm</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="packageHeight">Height (cm)</label>
                                        <input
                                            type="number"
                                            id="packageHeight"
                                            name="packageHeight"
                                            value={packageHeight}
                                            onChange={(e) => setPackageHeight(e.target.value)}
                                            min="5"
                                            max="100"
                                        />
                                        <small>Min: 5 cm, Max: 100 cm</small>
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
                        <div className="accordion-content shipping-service">
                            <form>
                                {["Express", "Fast", "Standard"].map((option) => (
                                    <div key={option} className="service-option">
                                        <label className="service-label">
                                            <input
                                                type="radio"
                                                name="shippingService"
                                                value={option}
                                                checked={selectedDeliveryOption === option}
                                                onChange={() => setSelectedDeliveryOption(option)}
                                                required
                                            />
                                            <span className="service-title">{option} Delivery</span>
                                        </label>
                                    </div>
                                ))}
                            </form>
                            <button onClick={calculatePrice} className="btn btn-calculate">
                                Calculate Prices
                            </button>
                            {estimatedPrice && (
                                <p className="estimated-price">Estimated Price: ${estimatedPrice}</p>
                            )}
                        </div>
                    )}
                </div>


                <div
                    ref={additionalOptionsRef}
                    className={`accordion-item ${activeSection === 'additionalOptions' ? 'active' : ''}`}
                >
                    <div className="accordion-title" onClick={() => toggleSection('additionalOptions')}>
                        <h3>Additional Options</h3>
                        <i className={`fas ${activeSection === 'additionalOptions' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'additionalOptions' && (
                        <div className="accordion-content">
                            <form>
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="insurance"
                                            onChange={(e) => handleAdditionalOptionChange(e, 'insurance')}
                                        />
                                        <span>Insurance (Add protection for valuable items)</span>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="signature"
                                            onChange={(e) => handleAdditionalOptionChange(e, 'signature')}
                                        />
                                        <span>Signature Confirmation (Recipient's signature required)</span>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="specialHandling"
                                            onChange={(e) => handleAdditionalOptionChange(e, 'specialHandling')}
                                        />
                                        <span>Special Handling (Fragile items, etc.)</span>
                                    </label>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <div ref={paymentRef} className={`accordion-item ${activeSection === 'payment' ? 'active' : ''}`}>
                    <div className="accordion-title" onClick={() => toggleSection('payment')}>
                        <h3>Payment *</h3>
                        <i className={`fas ${activeSection === 'payment' ? 'fa-chevron-up' : 'fa-chevron-down'} arrow`}></i>
                    </div>
                    {activeSection === 'payment' && (
                        <div className="accordion-content payment-section">
                            <h3>Select Payment Method</h3>
                            <div className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Credit Card"
                                    onChange={() => setPaymentMethod('Credit Card')}
                                    checked={paymentMethod === 'Credit Card'}
                                />
                                <label><i className="fas fa-credit-card"></i> Credit Card</label>
                            </div>
                            {paymentMethod === 'Credit Card' && (
                                <form className="credit-card-form">
                                    <div className="form-group">
                                        <label>Card Number *</label>
                                        <div className="input-with-icon">
                                            <i className="fas fa-credit-card"></i>
                                            <input type="text" placeholder="1234 5678 9012 3456"/>
                                        </div>
                                    </div>
                                    <div className="expiry-cvv-group">
                                        <div className="form-group">
                                            <label>Expiry Date *</label>
                                            <div className="input-with-icon">
                                                <i className="far fa-calendar-alt"></i>
                                                <input type="text" placeholder="MM/YY"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>CVV *</label>
                                            <div className="input-with-icon">
                                                <i className="fas fa-lock"></i>
                                                <input type="number" placeholder="123"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group cardholder-name-group">
                                        <label>Cardholder Name *</label>
                                        <input type="text" placeholder="Name on Card"/>
                                    </div>
                                </form>
                            )}
                            <div className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PayPal"
                                    onChange={() => setPaymentMethod('PayPal')}
                                    checked={paymentMethod === 'PayPal'}
                                />
                                <label><i className="fab fa-paypal"></i> PayPal</label>
                            </div>
                            {paymentMethod === 'PayPal' && (
                                <p className="payment-instruction">You will be redirected to PayPal to complete your
                                    payment.</p>
                            )}
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