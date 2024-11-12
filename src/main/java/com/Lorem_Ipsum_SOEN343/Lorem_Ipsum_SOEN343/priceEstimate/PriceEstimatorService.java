package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.priceEstimate;

import org.springframework.stereotype.Service;

@Service
public class PriceEstimatorService {

    private PriceCalculationStrategy strategy;

    public void setStrategy(String deliveryOption) {
        switch (deliveryOption) {
            case "Express":
                this.strategy = new ExpressDeliveryStrategy();
                break;
            case "Fast":
                this.strategy = new FastDeliveryStrategy();
                break;
            case "Standard":
            default:
                this.strategy = new StandardDeliveryStrategy();
                break;
        }
    }

    public double calculatePrice(double distance, double weight, double size, String deliveryOption) {
        setStrategy(deliveryOption);
        double baseRate = 5.0;
        double distanceRate = 0.1 * distance;
        double weightRate = 0.2 * weight;
        double sizeRate = 0.05 * size;
        return strategy.calculatePrice(baseRate, distanceRate, weightRate, sizeRate);
    }
}