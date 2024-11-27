class QuoteService {
    async getQuote(distance, weight, size, deliveryOption) {
        try {
            const response = await fetch(`http://localhost:8080/delivery/estimate?distance=${distance}&weight=${weight}&size=${size}&deliveryOption=${deliveryOption}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to estimate ');
            }

            const price = await response.json();
            return price;


        } catch (error) {
            console.error("Error estimating price:", error.message);
            throw error;
        }

    }


}


export default QuoteService;
