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

    // Address and package details state
    const [fromAddress, setFromAddress] = useState(sessionStorage.getItem('from') || '');
    const [toAddress, setToAddress] = useState(sessionStorage.getItem('to') || '');
    const [distance, setDistance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [packageWeight, setPackageWeight] = useState(sessionStorage.getItem('weight') || '');
    const [packageLength, setPackageLength] = useState(sessionStorage.getItem('length') || '');
    const [packageWidth, setPackageWidth] = useState(sessionStorage.getItem('width') || '');
    const [packageHeight, setPackageHeight] = useState(sessionStorage.getItem('height') || '');


    const packageSize = packageLength && packageWidth && packageHeight
        ? packageLength * packageWidth * packageHeight
        : null;

    // const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
    // const [estimatedPrice, setEstimatedPrice] = useState(null);


    // useEffect(() => {
    //     sessionStorage.clear();
    //     googleMapsService.loadGoogleMapsScript(() => {
    //         initializeAutocomplete(fromInputRef.current, setFromAddress, 'from');
    //         initializeAutocomplete(toInputRef.current, setToAddress, 'to');
    //     });
    // }, []);

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

    // useEffect(() => {
    //     if (fromAddress && toAddress) {
    //         calculateDistance().catch((error) => {
    //             console.error("Failed to calculate distance:", error);
    //         });
    //     } else {
    //         setDistance(null); // Clear distance if addresses are incomplete
    //     }
    // }, [fromAddress, toAddress]);


    const initializeAutocomplete = (input, setAddress) => {
        // if (!input) return;

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
            if (fromAddress && toAddress) {
                googleMapsService.calculateDistance(fromAddress, toAddress, (distance) => {
                    if (distance !== null) {
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
        });
    };


    const calculatePrice = async () => {
        setErrorMessage(null);
        console.log(fromAddress)
        console.log(toAddress)

        if (!packageWeight) {
            alert("Please enter the package weight.");
            return;
        }
        if (!packageSize) {
            alert("Please enter valid dimensions for the package.");
            return;
        }

        try {
            // await calculateDistance();
            // const calculatedDistance = distance || await calculateDistance();
            const calculatedDistance = await calculateDistance();
            // const calculatedDistance = distance;

            console.log("ADDRESSES:")
            console.log(fromAddress)
            console.log(toAddress)
            console.log("Distance:", calculatedDistance);
            console.log("Package Weight:", packageWeight);
            console.log("Package Size:", packageSize);
            // console.log("Selected Delivery Option:", selectedDeliveryOption);

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

        // try {
        //     // Call all three functions sequentially
        //     await handleGetQuoteExpress();
        //     await handleGetQuoteFast();
        //     await handleGetQuoteStandard();
        // } catch (err) {
        //     console.log("An error occurred while fetching quotes.");
        // }

    };



    // Handle Get Quote button click
    const handleGetQuote = async () => {
    //     setError(null); // Reset previous errors
    //
    //     // Validate required fields
    //     if (!fromAddress || !toAddress || !packageWeight || !packageLength || !packageWidth || !packageHeight) {
    //         setError('All fields are required');
    //         return;
    //     }
    //
    //     try {
    //         const estimatedPrice = await quoteService.getQuote(distance,
    //             packageWeight,
    //             packageSize,
    //             selectedDeliveryOption);
    //         setPrice(estimatedPrice);
    //     } catch (err) {
    //         setError('Failed toAddress get quote. Please try again.');
    //     }
    // };
        setError(null); // Reset previous errors

        // Validate required fields
        if (!fromAddress || !toAddress || !packageWeight || !packageLength || !packageWidth || !packageHeight) {
            setError('All fields are required');
            return;
        }

        try {
            // Call all three functions sequentially
            await handleGetQuoteExpress();
            await handleGetQuoteFast();
            await handleGetQuoteStandard();
        } catch (err) {
            console.log("An error occurred while fetching quotes.");
        }
    };

    const handleGetQuoteExpress = async () => {
        setError(null); // Reset previous errors

        // Validate required fields
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
        setError(null); // Reset previous errors

        // Validate required fields
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
        setError(null); // Reset previous errors

        // Validate required fields
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



    // Toggle active section for smooth scroll (optional)
    const toggleSection = (section) => {
        setActiveSection(section);
        const sectionRef = {
            // You can add more sections toAddress be toggled if needed
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
                    // ref={fromInputRef}
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
                    // ref={toInputRef}
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
                {/*<div>*/}
                <label htmlFor="pkgWeightQuote" className="quote-pkg-info-labels">Weight (Kg): </label>
                <input
                    type="text"
                    id="pkgWeightQuote"
                    placeholder="Weight"
                    value={packageWeight}
                    onChange={(e) => setPackageWeight(e.target.value)}
                    className="input-field small-input"
                />
                {/*</div>*/}
                {/*<div>*/}
                <label htmlFor="pkgLengthQuote" className="quote-pkg-info-labels">Length (cm):</label>
                <input
                    type="text"
                    id="pkgLengthQuote"
                    placeholder="Length"
                    value={packageLength}
                    onChange={(e) => setPackageLength(e.target.value)}
                    className="input-field small-input"
                />
                {/*</div>*/}
                <label htmlFor="pkgWidthQuote" className="quote-pkg-info-labels">Width (cm):</label>
                <input
                    type="text"
                    id="pkgWidthQuote"
                    placeholder="Width"
                    value={packageWidth}
                    onChange={(e) => setPackageWidth(e.target.value)}
                    className="input-field small-input"
                />
                <label htmlFor="pkgHeightQuote" className="quote-pkg-info-labels">Height (cm):</label>
                <input
                    type="text"
                    id="pkgHeightQuote"
                    placeholder="Height"
                    value={packageHeight}
                    onChange={(e) => setPackageHeight(e.target.value)}
                    className="input-field small-input"
                />
            </div>

            <button onClick={calculatePrice} className="quote-btn">
                Get Quote
            </button>

            <div className="quote-result">
                {(priceExpress && priceFast && priceStandard) && (
                    <hr className="separator-quote" />
                )}

                {priceExpress && (
                <div className="price-info">
                    <span className="label">Estimated Price for Express Delivery:</span>
                    <span className="value">${priceExpress}</span>
                </div>
                )}
                {priceFast && (
                    <div className="price-info">
                        <span className="label">Estimated Price for Fast Delivery:</span>
                        <span className="value">${priceFast}</span>
                    </div>
                )}
                {priceStandard && (
                    <div className="price-info">
                        <span className="label">Estimated Price for Standard Delivery:</span>
                        <span className="value">${priceStandard}</span>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Quotation;
