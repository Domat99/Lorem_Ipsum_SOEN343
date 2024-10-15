class GoogleMapsService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    loadGoogleMapsScript(callback) {
        if (!window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                if (callback) callback();
            };
            document.head.appendChild(script);
        } else {
            if (callback) callback();
        }
    }

    initAutocomplete(inputElement, callback) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputElement, {
            componentRestrictions: { country: ["ca", "us"] } // Restrict to Canada (ca) and USA (us)
        });
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (callback) callback(place);
        });
    }

    calculateDistance(origin, destination, callback) {
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === "OK") {
                    const distance = response.rows[0].elements[0].distance.text;
                    if (callback) callback(distance);
                }
            }
        );
    }
}

export default GoogleMapsService;
