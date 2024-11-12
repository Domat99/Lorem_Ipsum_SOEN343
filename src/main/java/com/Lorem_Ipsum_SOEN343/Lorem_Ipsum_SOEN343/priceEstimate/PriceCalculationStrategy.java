package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.priceEstimate;

public interface PriceCalculationStrategy {
    double calculatePrice(double baseRate, double distanceRate, double weightRate, double sizeRate);
}
