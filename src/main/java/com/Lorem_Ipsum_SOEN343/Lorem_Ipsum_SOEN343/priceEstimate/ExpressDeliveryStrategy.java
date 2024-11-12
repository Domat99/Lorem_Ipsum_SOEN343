package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.priceEstimate;

public class ExpressDeliveryStrategy implements PriceCalculationStrategy {

    @Override
    public double calculatePrice(double baseRate, double distanceRate, double weightRate, double sizeRate) {
        double optionMultiplier = 2.5; // Express multiplier
        return (baseRate + distanceRate + weightRate + sizeRate) * optionMultiplier;
    }

}
