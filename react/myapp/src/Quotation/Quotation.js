import React, { useEffect, useRef, useState } from 'react';
import './Quotation.css';
import QuoteService from './QuoteService';
import GoogleMapsService from '../GoogleMaps/GoogleMapsService';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const googleMapsService = new GoogleMapsService(apiKey);
const quoteService = new QuoteService();

const Quotation = () => {
    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);
    const [activeSection, setActiveSection] = useState(sessionStorage.getItem('activeSection') || null);
    const [priceExpress, setPriceExpress] = useState(null);
    const [priceFast, setPriceFast] = useState(null);
    const [priceStandard, setPriceStandard] = useState(null);
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);
    const [fromAddress, setFromAddress] = useState( '');
    const [toAddress, setToAddress] = useState('');
    const [distance, setDistance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [packageWeight, setPackageWeight] = useState( '');
    const [packageLength, setPackageLength] = useState( '');
    const [packageWidth, setPackageWidth] = useState('');
    const [packageHeight, setPackageHeight] = useState('');


    const packageSize = packageLength && packageWidth && packageHeight
        ? packageLength * packageWidth * packageHeight
        : null;

    useEffect(() => {
        googleMapsService.loadGoogleMapsScript();
    }, []);


    useEffect(() => {
        sessionStorage.setItem('from', fromAddress);
        sessionStorage.setItem('to', toAddress);
        sessionStorage.setItem('weight', packageWeight);
        sessionStorage.setItem('length', packageLength);
        sessionStorage.setItem('width', packageWidth);
        sessionStorage.setItem('height', packageHeight);
        sessionStorage.setItem('activeSection', activeSection);
    }, [fromAddress, toAddress, packageWeight, packageLength, packageWidth, packageHeight, activeSection]);


    const initializeAutocomplete = (input, setAddress) => {

        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.setFields(['formatted_address']);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
                setAddress(place.formatted_address);
            }
        });
    };

    const calculateDistance = () => {
        return new Promise((resolve, reject) => {
            try {
                if (fromAddress && toAddress) {
                    googleMapsService.calculateDistance(fromAddress, toAddress, (distance) => {
                        if (distance) {
                            const numericDistance = parseFloat(distance.replace(/[^0-9.]/g, ''));
                            setDistance(numericDistance);
                            resolve(numericDistance);
                        } else {
                            setErrorMessage("Failed to calculate the distance to get a quote. Please try again.");
                            reject(new Error("Failed to calculate the distance to get a quote."));
                        }
                    });
                } else {
                    setErrorMessage("Please enter both 'From' and 'To' addresses.");
                    reject(new Error("Addresses not provided"));
                }

            }
            catch (error){
                setErrorMessage("Failed to calculate Distance. Please try again.");
                console.error("Failed to calculate Distance:", error);
                alert(error);

            }
        });
    };


    const calculatePrice = async () => {
        setErrorMessage(null);
        // console.log(fromAddress)
        // console.log(toAddress)


        if (!fromAddress || !toAddress) {
            setErrorMessage("Please enter both the 'From' and 'To' addresses to get a new quote.");
            // alert("Please enter both the 'From' and 'To' addresses.");
            return;
        }

        if (!packageWeight) {
            setErrorMessage("Please enter the package weight to get a new quote.");
            // alert("Please enter the package weight.");
            return;
        }
        if (!packageSize) {
            setErrorMessage("Please enter all package dimensions to get a new quote.");
            // alert("Please enter valid dimensions for the package.");
            return;
        }

        try {
            const calculatedDistance = await calculateDistance();

            console.log("ADDRESSES:")
            console.log(fromAddress)
            console.log(toAddress)
            console.log("Distance:", calculatedDistance);
            console.log("Package Weight:", packageWeight);
            console.log("Package Size:", packageSize);

            if (calculatedDistance) {
                let basePriceExpress = await quoteService.getQuote(
                    calculatedDistance,
                    packageWeight,
                    packageSize,
                    "Express"
                );
                let basePriceFast = await quoteService.getQuote(
                    calculatedDistance,
                    packageWeight,
                    packageSize,
                    "Fast"
                );
                let basePriceStandard = await quoteService.getQuote(
                    calculatedDistance,
                    packageWeight,
                    packageSize,
                    "Standard"
                );


                setPriceExpress(basePriceExpress.toFixed(2));
                setPriceFast(basePriceFast.toFixed(2));
                setPriceStandard(basePriceStandard.toFixed(2));

                console.log("Estimated Price with basePriceExpress:", basePriceExpress.toFixed(2));
                console.log("Estimated Price with basePriceFast:", basePriceFast.toFixed(2));
                console.log("Estimated Price with basePriceStandard:", basePriceStandard.toFixed(2));
            } else {
                setErrorMessage("Distance calculation failed. Please check the addresses.");
            }
        } catch (error) {
            setErrorMessage("Failed to calculate price. Please try again.");
            console.error("Failed to calculate price:", error);
        }

    };


    const handleGetQuote = async () => {
        setError(null);

        if (!fromAddress || !toAddress || !packageWeight || !packageLength || !packageWidth || !packageHeight) {
            setError('All fields are required');
            return;
        }

        try {
            await handleGetQuoteExpress();
            await handleGetQuoteFast();
            await handleGetQuoteStandard();
        } catch (err) {
            console.log("An error occurred while fetching quotes.");
        }
    };

    const handleGetQuoteExpress = async () => {
        setError(null);

        if (!fromAddress || !toAddress || !packageWeight || !packageLength || !packageWidth || !packageHeight) {
            setError('All fields are required');
            return;
        }

        try {
            const estimatedPrice = await quoteService.getQuote(distance,
                packageWeight,
                packageSize,
                "Express");
            setPriceExpress(estimatedPrice);
        } catch (err) {
            console.log("1");
            setError('Failed toAddress get quote. Please try again. 1');
        }
    };

    const handleGetQuoteFast = async () => {
        setError(null);

        if (!fromAddress || !toAddress || !packageWeight || !packageLength || !packageWidth || !packageHeight) {
            setError('All fields are required');
            return;
        }

        try {
            const estimatedPrice = await quoteService.getQuote(distance,
                packageWeight,
                packageSize,
                "Fast");
            setPriceFast(estimatedPrice);
        } catch (err) {
            console.log("2");
            setError('Failed toAddress get quote. Please try again. 2');
        }
    };

    const handleGetQuoteStandard = async () => {
        setError(null);

        if (!fromAddress || !toAddress || !packageWeight || !packageLength || !packageWidth || !packageHeight) {
            setError('All fields are required');
            return;
        }

        try {
            const estimatedPrice = await quoteService.getQuote(distance,
                packageWeight,
                packageSize,
                "Standard");
            setPriceStandard(estimatedPrice);
        } catch (err) {
            console.log("3");
            setError('Failed to get quote. Please try again. 3');
        }
    };


    const handleAutocomplete = (inputElement, setAddress) => {
        googleMapsService.initAutocomplete(inputElement, (place) => {
            setAddress(place.formatted_address);
        });
    };


    const toggleSection = (section) => {
        setActiveSection(section);
        const sectionRef = {
        }[section];

        if (sectionRef && sectionRef.current) {
            setTimeout(() => {
                const yOffset = -100;
                const yPosition = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: yPosition, behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <div className="quotation-container">
            <h2 className="quotation-title">Get a Shipping Quote</h2>
            <div className="form-group-quote">
                <label htmlFor="fromAddressQuote" className="quote-pkg-info-labels">Origin Address *</label>
                <input
                    type="text"
                    id="fromAddressQuote"
                    placeholder="From"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    onFocus={(e) => handleAutocomplete(e.target, setFromAddress)}
                    className="input-field"
                    required
                />
                <label htmlFor="toAddressQuote" className="quote-pkg-info-labels">Destination Address *</label>
                <input
                    type="text"
                    id="toAddressQuote"
                    placeholder="To"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    onFocus={(e) => handleAutocomplete(e.target, setToAddress)}
                    className="input-field"
                    required
                />
            </div>

            <h3 className="package-info-title">Package Information:</h3>


            <div className="form-group-quote package-info">
                <div className="input-group">
                    <label htmlFor="pkgWeightQuote" className="quote-pkg-info-labels">Weight (Kg)*</label>
                    <input
                        type="number"
                        id="pkgWeightQuote"
                        placeholder="Weight"
                        value={packageWeight}
                        onChange={(e) => setPackageWeight(e.target.value)}
                        className="input-field small-input"
                        onWheel={(e) => e.target.blur()}
                        step="0.25"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="pkgLengthQuote" className="quote-pkg-info-labels">Length (cm)*</label>
                    <input
                        type="number"
                        id="pkgLengthQuote"
                        placeholder="Length"
                        value={packageLength}
                        onChange={(e) => setPackageLength(e.target.value)}
                        className="input-field small-input"
                        onWheel={(e) => e.target.blur()}
                        step="5"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="pkgWidthQuote" className="quote-pkg-info-labels">Width (cm)*</label>
                    <input
                        type="number"
                        id="pkgWidthQuote"
                        placeholder="Width"
                        value={packageWidth}
                        onChange={(e) => setPackageWidth(e.target.value)}
                        className="input-field small-input"
                        onWheel={(e) => e.target.blur()}
                        step="5"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="pkgHeightQuote" className="quote-pkg-info-labels">Height (cm)*</label>
                    <input
                        type="number"
                        id="pkgHeightQuote"
                        placeholder="Height"
                        value={packageHeight}
                        onChange={(e) => setPackageHeight(e.target.value)}
                        className="input-field small-input"
                        onWheel={(e) => e.target.blur()}
                        step="5"
                    />
                </div>
            </div>

            <button onClick={calculatePrice} className="quote-btn">
                Get Quote
            </button>

            <div className="quote-result">
                {errorMessage && <p className="error-message">{errorMessage}</p>}


                {(!errorMessage && priceExpress && priceFast && priceStandard) && (
                    <hr className="separator-quote"/>
                )}

                {!errorMessage &&
                    priceExpress && (
                    <div className="price-info">
                        <span className="label">Estimated Price for Express Delivery:</span>
                        <span className="value">${priceExpress}</span>
                    </div>
                )}

                {!errorMessage &&
                    priceFast && (
                    <div className="price-info">
                        <span className="label">Estimated Price for Fast Delivery:</span>
                        <span className="value">${priceFast}</span>
                    </div>
                )}

                {!errorMessage &&
                    priceStandard && (
                    <div className="price-info">
                        <span className="label">Estimated Price for Standard Delivery:</span>
                        <span className="value">${priceStandard}</span>
                    </div>
                )}

                {(!errorMessage && priceExpress && priceFast && priceStandard) && (
                    <div>
                        <hr className="separator-msg"/>
                        <p className="quoteInfoMsg">
                            *Please note that this is a quote only. The final price might be different based on additional options.
                            {/*<br/>*Minimum and Maximum accepted weight and size are not reflected on this page.*/}
                            {/*<br/>*The most accurate and final price will be produced when creating a shipment*/}
                        </p>
                    </div>
                )}

            </div>

        </div>
    );

};

export default Quotation;
