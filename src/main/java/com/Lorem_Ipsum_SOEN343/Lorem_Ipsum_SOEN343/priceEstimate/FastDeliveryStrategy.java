package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.priceEstimate;

public class FastDeliveryStrategy implements PriceCalculationStrategy {

    @Override
    public double calculatePrice(double baseRate, double distanceRate, double weightRate, double sizeRate) {
        double optionMultiplier = 1.5;
        return (baseRate + distanceRate + weightRate + sizeRate) * optionMultiplier;
    }
}
