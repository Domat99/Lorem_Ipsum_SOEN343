package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery;

import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.priceEstimate.PriceEstimatorService;
import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages.PackageRepo;
import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages.Packages;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeliveryFacade {

    private final DeliveryService deliveryService;
    private final DeliveryRepo deliveryRepo;
    private final PackageRepo packageRepo;
    private final PriceEstimatorService priceEstimatorService;

    @Autowired
    public DeliveryFacade(DeliveryService deliveryService, DeliveryRepo deliveryRepo, PackageRepo packageRepo, PriceEstimatorService priceEstimatorService) {
        this.deliveryService = deliveryService;
        this.deliveryRepo = deliveryRepo;
        this.packageRepo = packageRepo;
        this.priceEstimatorService = priceEstimatorService;
    }

    public Delivery createDelivery(ObjectId userId, String deliveryOption, double distance, String originAddress, String destinationAddress, Packages pkg, int trackingNumber, boolean insurance, boolean specialHandling, boolean signatureRequired) {
        double estimatedPrice = priceEstimatorService.calculatePrice(distance, pkg.getWeight(), pkg.getSize(), deliveryOption);
        pkg = packageRepo.save(pkg);

        Delivery delivery = deliveryService.createDelivery(pkg, userId, deliveryOption, distance, originAddress, destinationAddress, trackingNumber, insurance, specialHandling, signatureRequired);
        delivery.setEstimatedPrice(estimatedPrice);
        deliveryRepo.save(delivery);
        if(userId != null){
            deliveryService.updateUserDeliveries(userId, delivery.getId());
        }

        return delivery;
    }

    public double estimatePrice(double distance, double weight, double size, String deliveryOption) {
        return priceEstimatorService.calculatePrice(distance, weight, size, deliveryOption);
    }

    public Delivery getDeliveryDetails(ObjectId deliveryId) {
        return deliveryRepo.findById(deliveryId).orElseThrow(() -> new RuntimeException("Delivery not found"));
    }

    public List<Delivery> getUserDeliveries(ObjectId userId) {
        return deliveryService.getUserDeliveries(userId);
    }

    public void updateDeliveryStatus(ObjectId deliveryId, EnumStatus status) {
        Delivery delivery = deliveryRepo.findById(deliveryId).orElseThrow(() -> new RuntimeException("Delivery not found"));
        delivery.setStatus(status);
        deliveryRepo.save(delivery);
    }

    public boolean isTrackingNumberUnique(int trackingNumber) {
        return !deliveryRepo.existsByTrackingNumber(trackingNumber);
    }

    public Delivery getDeliveryStatusByTrackingNumber(int trackingNumber) {

        Delivery delivery = deliveryRepo.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Delivery not found with tracking number: " + trackingNumber));

        return delivery;
    }
}
