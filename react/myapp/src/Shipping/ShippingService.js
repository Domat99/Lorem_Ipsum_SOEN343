class ShippingService {
    async estimatePrice(distance, weight, size, deliveryOption) {
        try {
            const response = await fetch(`http://localhost:8080/delivery/estimate?distance=${distance}&weight=${weight}&size=${size}&deliveryOption=${deliveryOption}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to estimate price');
            }

            const price = await response.json();
            return price;
        } catch (error) {
            console.error("Error estimating price:", error.message);
            throw error;
        }
    }

    async createDelivery(data) {
        try {
            const response = await fetch('http://localhost:8080/delivery/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create delivery');
            }

            const delivery = await response.json();
            return delivery;
        } catch (error) {
            console.error("Error creating delivery:", error.message);
            throw error;
        }
    }
}

export default ShippingService;
