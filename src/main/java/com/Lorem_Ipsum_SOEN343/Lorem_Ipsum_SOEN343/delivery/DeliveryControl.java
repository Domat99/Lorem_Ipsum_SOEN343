package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery;

import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages.Packages;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/delivery")
public class DeliveryControl {

    private final DeliveryFacade deliveryFacade;

    @Autowired
    public DeliveryControl(DeliveryFacade deliveryFacade) {
        this.deliveryFacade = deliveryFacade;
    }

    @PostMapping("/create")
    public Delivery createDelivery(
            @RequestBody Packages pkg,
            @RequestParam(required = false)  ObjectId userId,
            @RequestParam String deliveryOption,
            @RequestParam double distance,
            @RequestParam String originAddress,
            @RequestParam String destinationAddress,
            @RequestParam int trackingNumber,
            @RequestParam boolean insurance,
            @RequestParam boolean specialHandling,
            @RequestParam boolean signatureRequired) {

        return deliveryFacade.createDelivery(userId, deliveryOption, distance, originAddress, destinationAddress, pkg, trackingNumber, insurance, specialHandling, signatureRequired);
    }

    @GetMapping("/estimate")
    public double estimatePrice(
            @RequestParam double distance,
            @RequestParam double weight,
            @RequestParam double size,
            @RequestParam String deliveryOption) {

        return deliveryFacade.estimatePrice(distance, weight, size, deliveryOption);
    }

    @GetMapping("/{id}")
    public Delivery getDeliveryById(@PathVariable ObjectId id) {
        return deliveryFacade.getDeliveryDetails(id);
    }

    @GetMapping("/user/{userId}")
    public List<Delivery> getUserDeliveries(@PathVariable ObjectId userId) {
        return deliveryFacade.getUserDeliveries(userId);
    }

    @GetMapping("/check-tracking-number")
    public boolean checkTrackingNumber(@RequestParam int trackingNumber) {
        return deliveryFacade.isTrackingNumberUnique(trackingNumber);
    }

    @GetMapping("/status")
    public Delivery getDeliveryStatus(@RequestParam int trackingNumber) {
        return deliveryFacade.getDeliveryStatusByTrackingNumber(trackingNumber);
    }
}