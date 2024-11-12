package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery;

import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.deliveryObserver.DeliveryStatusUpdater;
import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.priceEstimate.PriceEstimatorService;
import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.User.*;
import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepo deliveryRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PriceEstimatorService priceEstimatorService;

    @Autowired
    private DeliveryStatusUpdater deliveryStatusUpdater;

    public double getPriceEstimation(double distance, double weight, double size, String deliveryOption) {
        return priceEstimatorService.calculatePrice(distance, weight, size, deliveryOption);
    }

    public Delivery createDelivery(Packages pkg, ObjectId userId, String deliveryOption, double distance, String originAddress, String destinationAddress, int trackingNumber) {
        double estimatedPrice = getPriceEstimation(distance, pkg.getWeight(), pkg.getSize(), deliveryOption);
        LocalDate currentDate = LocalDate.now();
        LocalDate deliveryDate = switch (deliveryOption) {
            case "Express" -> currentDate.plusDays(2);
            case "Fast" -> currentDate.plusDays(4);
            case "Standard" -> currentDate.plusDays(7);
            default -> currentDate.plusDays(10);
        };

        Delivery delivery = new Delivery();
        delivery.setPackageId(pkg.getId());
        delivery.setUserId(userId);
        delivery.setEstimatedPrice(estimatedPrice);
        delivery.setDeliveryOption(deliveryOption);
        delivery.setDistance(distance);
        delivery.setOriginAddress(originAddress);
        delivery.setDestinationAddress(destinationAddress);
        delivery.setDeliveryDate(deliveryDate);
        delivery.setTrackingNumber(trackingNumber);
        delivery.setStatus(EnumStatus.PENDING);

        updateUserDeliveries(userId, delivery.getId());
        return delivery;
    }

    public List<Delivery> getUserDeliveries(ObjectId userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getDeliveries().stream()
                .map(deliveryRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    private void updateUserDeliveries(ObjectId userId, ObjectId deliveryId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.addDelivery(deliveryId);
        userRepository.save(user);
    }

    @EventListener(ContextRefreshedEvent.class)
    public void updateDeliveryStatusesOnStartup() {
        List<Delivery> deliveries = deliveryRepository.findAll();

        for (Delivery delivery : deliveries) {
            deliveryStatusUpdater.updateDeliveryStatus(delivery);
        }
    }

}
