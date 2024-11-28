import React, { useEffect, useRef, useState } from 'react';
import "./ShippingStyle.css";
import GoogleMapsService from '../GoogleMaps/GoogleMapsService';
import ShippingService from "./ShippingService";
import ReviewModal from './ReviewModal';
import { useNavigate } from "react-router-dom";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const googleMapsService = new GoogleMapsService(apiKey);
const shippingService = new ShippingService();

const Shipping = () => {
    const navigate = useNavigate();
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [shipmentDetails, setShipmentDetails] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const shipFromRef = useRef(null);
    const shipToRef = useRef(null);
    const packageInfoRef = useRef(null);
    const shippingServiceRef = useRef(null);
    const additionalOptionsRef = useRef(null);
    const paymentRef = useRef(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [activeSection, setActiveSection] = useState(null);
    const [distance, setDistance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [fromAddress, setFromAddress] = useState('');
    const [fromName, setFromName] = useState('');
    const [fromContact, setFromContact] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [fromPhone, setFromPhone] = useState('');
    const [fromExtension, setFromExtension] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [toPhone, setToPhone] = useState('');
    const [toExtension, setToExtension] = useState('');
    const [packageType, setPackageType] = useState('My Packaging');
    const [packageWeight, setPackageWeight] = useState('');
    const [packageLength, setPackageLength] = useState('');
    const [packageWidth, setPackageWidth] = useState('');
    const [packageHeight, setPackageHeight] = useState('');
    const [packageValue, setPackageValue] = useState('');
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const closeReviewModal = () => setShowReviewModal(false);
    const packageSize = packageLength && packageWidth && packageHeight
        ? packageLength * packageWidth * packageHeight
        : null;

    const [additionalOptions, setAdditionalOptions] = useState({
        insurance: false,
        signature: false,
        specialHandling: false,
    });

    const resetFormFields = () => {
        setFromAddress('');
        setFromContact('');
        setFromPhone('');
        setFromExtension('');
        setToAddress('');
        setToEmail('');
        setToPhone('');
        setToExtension('');
        setPackageType('My Packaging');
        setPackageWeight('');
        setPackageLength('');
        setPackageWidth('');
        setPackageHeight('');
        setPackageValue('');
        setSelectedDeliveryOption('');
        setDistance(null);
        setEstimatedPrice(null);
        setAdditionalOptions({
            insurance: false,
            signature: false,
            specialHandling: false,
        });
        setPaymentMethod('');
        setActiveSection('shipFrom');

        if (isGuest) {
            setFromEmail('');
            setFromName('');
        }
    };


    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);

                if (parsedUser?.id) {
                    console.log('User ID fetched from localStorage:', parsedUser.id);
                    setUserId(parsedUser.id);

                    if (parsedUser.email) {
                        setFromEmail(parsedUser.email);
                    }

                    if (parsedUser.name) {
                        setFromName(parsedUser.name);
                    }
                } else {
                    console.warn('Invalid user data: Missing "id" field.');
                    setUserId(null);
                    setShowLoginModal(true);
                }
            } catch (error) {
                console.warn('Error parsing user data from localStorage:', error);
                setUserId(null);
                setShowLoginModal(true);
            }
        } else {
            console.info('No user data found in localStorage.');
            if (!isGuest) {
                setShowLoginModal(true);
            }
        }
    }, [isGuest]);

    const handleCancel = () => {
        navigate("/");
    };

    const handleAdditionalOptionChange = (event, option) => {
        setAdditionalOptions((prevOptions) => ({
            ...prevOptions,
            [option]: event.target.checked,
        }));
    };
    const openReviewModal = async () => {
        try {
            setErrorMessage(null);
            if (!isTermsChecked) {
                setErrorMessage("You must agree to the terms and conditions before continuing.");
                return;
            }
            if (!fromAddress) {
                setErrorMessage("Please enter the 'Ship From' address.");
                document.getElementById("fromAddress1")?.classList.add("input-error");
                return;
            } else {
                document.getElementById("fromAddress1")?.classList.remove("input-error");
            }

            if (!fromName) {
                setErrorMessage("Please enter the sender's full name or company name.");
                document.getElementById("fromName")?.classList.add("input-error");
                return;
            } else {
                document.getElementById("fromName")?.classList.remove("input-error");
            }

            if (!fromEmail) {
                setErrorMessage("Please enter a valid sender email.");
                document.getElementById("fromEmail")?.classList.add("input-error");
                return;
            } else {
                document.getElementById("fromEmail")?.classList.remove("input-error");
            }

            if (!fromPhone) {
                setErrorMessage("Please enter a valid sender phone number.");
                document.getElementById("fromPhone")?.classList.add("input-error");
                return;
            } else {
                document.getElementById("fromPhone")?.classList.remove("input-error");
            }

            if (!toAddress) {
                setErrorMessage("Please enter the 'Ship To' address.");
                document.getElementById("toAddress")?.classList.add("input-error");
                return;
            } else {
                document.getElementById("toAddress")?.classList.remove("input-error");
            }

            if (!toEmail) {
                setErrorMessage("Please enter the recipient's email address.");
                document.getElementById("toEmail")?.classList.add("input-error");
                return;
            } else {
                document.getElementById("toEmail")?.classList.remove("input-error");
            }

            if (!toPhone) {
                setErrorMessage("Please enter the recipient's phone number.");
                document.getElementById("toPhone")?.classList.add("input-error");
                return;
            } else {
                document.getElementById("toPhone")?.classList.remove("input-error");
            }

            if (!packageWeight) {
                setErrorMessage("Please enter the package weight.");
                document.getElementById("packageWeight")?.classList.add("input-error");
                return;
            } else {
                document.getElementById("packageWeight")?.classList.remove("input-error");
            }

            if (!packageSize) {
                setErrorMessage("Please enter valid package dimensions.");
                return;
            }

            if (!selectedDeliveryOption) {
                setErrorMessage("Please select a delivery option.");
                return;
            }

            if (!paymentMethod) {
                setErrorMessage("Please select a payment method.");
                return;
            }

            await calculateDistance();
            await calculatePrice();

            setShowReviewModal(true);
        } catch (error) {
            console.error("Cannot open review modal:", error);
            setErrorMessage("Please ensure all required fields are filled correctly.");
        }
    };


    useEffect(() => {
        googleMapsService.loadGoogleMapsScript();
    }, []);

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
                setErrorMessage("Please enter both ship From and ship To addresses.");
                reject(new Error("Addresses not provided"));
            }
        });
    };

    const calculatePrice = async () => {
        try {
            setErrorMessage(null);
            if (!fromAddress) {
                setErrorMessage("Please enter the Ship From address.");
                return Promise.reject("No Ship From address provided");
            }
            if (!toAddress) {
                setErrorMessage("Please enter the Ship To address.");
                return Promise.reject("No Ship To address provided");
            }
            if (!selectedDeliveryOption) {
                setErrorMessage("Please select a delivery option.");
                return Promise.reject("No delivery option selected");
            }
            if (!packageWeight) {
                setErrorMessage("Please enter the package weight.");
                return Promise.reject("No package weight provided");
            }
            if (!packageSize) {
                setErrorMessage("Please enter valid dimensions for the package.");
                return Promise.reject("No package size provided");
            }
            const calculatedDistance = await calculateDistance();

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
                return Promise.resolve(basePrice);
            } else {
                setErrorMessage("Distance calculation failed. Please check the addresses.");
                return Promise.reject("Distance calculation failed");
            }
        } catch (error) {
            console.error("Failed to calculate price:", error);
            setErrorMessage("Failed to calculate price. Please try again.");
            return Promise.reject(error);
        }
    };

    const toggleSection = async (section) => {
        if (activeSection === 'shippingService' && section !== 'shippingService' && !estimatedPrice) {
            try {
                await calculatePrice();
            } catch (error) {
                console.error("Price calculation failed when toggling section:", error);
            }
        }

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
                window.scrollTo({ top: yPosition, behavior: 'smooth' });
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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            console.log("Shipment submission started...");
            const generateTrackingNumber = async () => {
                const response = await fetch("http://localhost:8080/delivery/generate-tracking-number");
                if (!response.ok) {
                    throw new Error("Failed to generate a unique tracking number.");
                }
                return await response.json();
            };

            const trackingNumber = await generateTrackingNumber();
            console.log("Generated Tracking Number:", trackingNumber);

            const pkg = {
                packageType,
                weight: parseFloat(packageWeight) || 0,
                dimensions: {
                    length: parseFloat(packageLength) || 0,
                    width: parseFloat(packageWidth) || 0,
                    height: parseFloat(packageHeight) || 0,
                },
                value: parseFloat(packageValue) || 0,
            };

            console.log("Package data:", JSON.stringify(pkg, null, 2));

            const queryParams = new URLSearchParams({
                deliveryOption: selectedDeliveryOption,
                distance: parseFloat(distance) || 0,
                originAddress: fromAddress,
                destinationAddress: toAddress,
                trackingNumber: trackingNumber.toString(),
                insurance: additionalOptions.insurance,
                specialHandling: additionalOptions.specialHandling,
                signatureRequired: additionalOptions.signature,
            });

            if (!isGuest) {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    try {
                        const parsedUser = JSON.parse(storedUser);
                        if (parsedUser?.id) {
                            queryParams.append('userId', parsedUser.id);
                        }
                    } catch (error) {
                        console.error("Error parsing stored user:", error);
                    }
                }
            } else {
                console.log("Guest mode: userId not included.");
            }


            console.log("Query parameters:", queryParams.toString());
            const response = await fetch(`http://localhost:8080/delivery/create?${queryParams.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pkg),
            });

            if (!response.ok) {
                const responseData = await response.json();
                console.error("Backend error response:", responseData);
                throw new Error(responseData.message || "Failed to create shipment");
            }

            const createdDelivery = await response.json();
            console.log("Shipment successfully created:", createdDelivery);

            setShipmentDetails({
                trackingNumber,
                fromAddress,
                toAddress,
                packageType,
                packageWeight,
                estimatedPrice,
                selectedDeliveryOption,
            });
            setShowReviewModal(false);
            setShowConfirmation(true);
        } catch (error) {
            console.error("Error creating shipment:", error.message || error);
            setErrorMessage("Failed to create shipment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shipping-page">
            <h1>Create a Shipment</h1>
            {userId && <p className="debug-info">Debug: Logged-in User ID: {userId}</p>}
            {showLoginModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Welcome!</h2>
                        <p>You need to log in to continue. Or you can proceed as a guest.</p>
                        <div className="modal-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => window.location.href = '/login'}
                            >
                                Log In
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setIsGuest(true);
                                    setUserId(null);
                                    setShowLoginModal(false);
                                }}
                            >
                                Continue as Guest
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                    <label htmlFor="fromAddress1">Address *</label>
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
                                    <label htmlFor="toAddress">Address *</label>
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
                                        onWheel={(e) => e.target.blur()}
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
                                            onWheel={(e) => e.target.blur()}
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
                                            onWheel={(e) => e.target.blur()}
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
                                            onWheel={(e) => e.target.blur()}
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
                                        onChange={(e) => {
                                            const value = parseFloat(e.target.value);
                                            if (!isNaN(value) && value >= 0) {
                                                setPackageValue(value);
                                            } else if (value < 0) {
                                                setPackageValue('');
                                            }
                                        }}
                                        onWheel={(e) => e.target.blur()}
                                        placeholder="Enter value in CAD"
                                        min="0"
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
                                        <span>Insurance (Add protection for valuable items) + 10$</span>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="signature"
                                            onChange={(e) => handleAdditionalOptionChange(e, 'signature')}
                                        />
                                        <span>Signature Confirmation (Recipient's signature required) + 2$</span>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="specialHandling"
                                            onChange={(e) => handleAdditionalOptionChange(e, 'specialHandling')}
                                        />
                                        <span>Special Handling (Fragile items, etc.) + 7$ </span>
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
                                    id="payment-credit-card"
                                    name="paymentMethod"
                                    value="Credit Card"
                                    onChange={() => setPaymentMethod('Credit Card')}
                                    checked={paymentMethod === 'Credit Card'}
                                />
                                <label htmlFor="payment-credit-card">
                                    <i className="fas fa-credit-card"></i> Credit Card
                                </label>
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
                                    id="payment-paypal"
                                    name="paymentMethod"
                                    value="PayPal"
                                    onChange={() => setPaymentMethod('PayPal')}
                                    checked={paymentMethod === 'PayPal'}
                                />
                                <label htmlFor="payment-paypal">
                                    <i className="fab fa-paypal"></i> PayPal
                                </label>
                            </div>
                            {paymentMethod === 'PayPal' && (
                                <p className="payment-instruction">You will be redirected to PayPal to complete your
                                    payment.</p>
                            )}
                        </div>
                    )}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            </div>

            <div className="terms">
                <label>
                    <input
                        type="checkbox"
                        checked={isTermsChecked}
                        onChange={(e) => setIsTermsChecked(e.target.checked)}
                    />
                    I agree to the
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowTermsModal(true);
                        }}
                    >
                        Terms and Conditions
                    </a>
                </label>
            </div>

            <div className="form-actions">
                <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel Shipment
                </button>
                <button
                    className="btn btn-primary"
                    onClick={openReviewModal}
                >
                    Review and Continue
                </button>
            </div>


            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Creating shipment... Please wait.</p>
                </div>
            )}
            {showReviewModal && (
                <ReviewModal
                    fromAddress={fromAddress}
                    fromName={fromName}
                    toAddress={toAddress}
                    toEmail={toEmail}
                    toPhone={toPhone}
                    packageType={packageType}
                    packageWeight={packageWeight}
                    packageSize={packageSize}
                    additionalOptions={additionalOptions}
                    paymentMethod={paymentMethod}
                    estimatedPrice={estimatedPrice}
                    selectedDeliveryOption={selectedDeliveryOption}
                    onConfirm={handleSubmit}
                    onClose={closeReviewModal}
                />
            )}

            {showTermsModal && (
                <div className="modal-overlay terms-modal-overlay">
                    <div className="modal-content terms-modal-content">
                        <h2 className="terms-title">Terms and Conditions for Shipment</h2>
                        <p className="terms-intro">
                            By creating a shipment with Pigeon Express, you agree to the following terms and conditions.
                        </p>
                        <div className="terms-content">
                            <section>
                                <h3>1. Accuracy of Information</h3>
                                <p>
                                    You are responsible for providing accurate and complete shipment information,
                                    including sender and recipient details, package dimensions, and weight. Any errors
                                    may result in delays, additional charges, or cancellation of the shipment.
                                </p>
                            </section>
                            <section>
                                <h3>2. Prohibited Items</h3>
                                <p>
                                    The following items are prohibited from shipment:
                                    <ul className="terms-list">
                                        <li>Hazardous materials, flammable or toxic substances.</li>
                                        <li>Illegal items, contraband, or counterfeit goods.</li>
                                        <li>Perishable items or live animals.</li>
                                    </ul>
                                    Shipments containing prohibited items may be confiscated or rejected.
                                </p>
                            </section>
                            <section>
                                <h3>3. Package Security</h3>
                                <p>
                                    It is your responsibility to securely package your shipment to prevent damage during
                                    transit. Pigeon Express is not liable for damage caused by improper packaging.
                                </p>
                            </section>
                            <section>
                                <h3>4. Delivery Timeline</h3>
                                <p>
                                    While we strive to deliver shipments within the estimated timeframe, delays may
                                    occur due to unforeseen circumstances, including weather, customs clearance, or high
                                    shipping demand. Pigeon Express is not liable for such delays.
                                </p>
                            </section>
                            <section>
                                <h3>5. Liability and Insurance</h3>
                                <p>
                                    Pigeon Express's liability for lost or damaged shipments is limited to the declared
                                    value of the package or the coverage provided under optional insurance, if
                                    purchased. Additional insurance can be added during the checkout process.
                                </p>
                            </section>
                            <section>
                                <h3>6. Cancellation Policy</h3>
                                <p>
                                    Shipments can be canceled before pickup. Refunds are subject to review and may
                                    exclude administrative fees. Once the shipment is in transit, cancellations are no
                                    longer permitted.
                                </p>
                            </section>
                            <section>
                                <h3>7. Payment Terms</h3>
                                <p>
                                    All charges, including shipping fees, taxes, and optional services, must be paid in
                                    full before the shipment is processed. Payments are non-refundable unless explicitly
                                    stated in our refund policy.
                                </p>
                            </section>
                            <section>
                                <h3>8. Changes to Terms</h3>
                                <p>
                                    Pigeon Express reserves the right to modify these terms and conditions at any time.
                                    Continued use of our services after updates constitutes your acceptance of the
                                    revised terms.
                                </p>
                            </section>
                            <section>
                                <h3>9. Contact Information</h3>
                                <p>
                                    For any questions or concerns about your shipment or these terms, please contact
                                    us: <br/>
                                    <strong>Email:</strong> support@pigeonexpress.com <br/>
                                    <strong>Phone:</strong> +1 (800) 123-4567
                                </p>
                            </section>
                        </div>
                        <button
                            className="btn btn-primary terms-agree-btn"
                            onClick={() => setShowTermsModal(false)}
                        >
                            I Agree
                        </button>
                    </div>
                </div>
            )}

            {showConfirmation && shipmentDetails && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Thank You!</h2>
                        <p>Your shipment has been successfully created.</p>
                        <div className="shipment-details">
                            <p><strong>Tracking Number:</strong> {shipmentDetails.trackingNumber}</p>
                            <p><strong>From:</strong> {shipmentDetails.fromAddress}</p>
                            <p><strong>To:</strong> {shipmentDetails.toAddress}</p>
                            <p><strong>Package Type:</strong> {shipmentDetails.packageType}</p>
                            <p><strong>Weight:</strong> {shipmentDetails.packageWeight} kg</p>
                            <p><strong>Estimated Price:</strong> ${shipmentDetails.estimatedPrice}</p>
                            <p><strong>Delivery Option:</strong> {shipmentDetails.selectedDeliveryOption}</p>
                        </div>
                        <div className="modal-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    resetFormFields();
                                    setShowConfirmation(false);
                                }}
                            >
                                Create Another Shipment
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => window.location.href = '/'}
                            >
                                Go Back Home
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
        ;
};

export default Shipping;
