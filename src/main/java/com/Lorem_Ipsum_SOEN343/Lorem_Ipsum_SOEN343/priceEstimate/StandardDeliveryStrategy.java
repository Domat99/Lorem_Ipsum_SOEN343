package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.priceEstimate;

public class StandardDeliveryStrategy implements PriceCalculationStrategy{
    @Override
    public double calculatePrice(double baseRate, double distanceRate, double weightRate, double sizeRate) {
        double optionMultiplier = 1.0; // Standard multiplier
        return (baseRate + distanceRate + weightRate + sizeRate) * optionMultiplier;
    }
}
