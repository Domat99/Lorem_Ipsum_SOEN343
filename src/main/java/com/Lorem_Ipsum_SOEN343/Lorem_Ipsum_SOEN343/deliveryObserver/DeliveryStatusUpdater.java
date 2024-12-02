package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.deliveryObserver;

import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery.Delivery;
import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery.DeliveryRepo;
import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery.EnumStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class DeliveryStatusUpdater implements DeliveryStatusObserver {

    @Autowired
    private DeliveryRepo deliveryRepository;

    @Override
    public void updateDeliveryStatus(Delivery delivery) {
        EnumStatus newStatus = determineStatus(delivery.getDeliveryDate(), delivery.getDeliveryOption());

        if (delivery.getStatus() != newStatus) {
            delivery.setStatus(newStatus);
            deliveryRepository.save(delivery);
        }
    }


    private EnumStatus determineStatus(LocalDate deliveryDate, String deliveryOption) {
        LocalDate today = LocalDate.now();
        long daysRemaining = ChronoUnit.DAYS.between(today, deliveryDate);

        switch (deliveryOption) {
            case "Express":
                if (daysRemaining < 0) return EnumStatus.DELIVERED;
                if (daysRemaining == 0) return EnumStatus.OUT_FOR_DELIVERY;
                if (daysRemaining == 1) return EnumStatus.SHIPPED;
                break;
            case "Fast":
                if (daysRemaining <= 0) return EnumStatus.DELIVERED;
                if (daysRemaining <= 1) return EnumStatus.OUT_FOR_DELIVERY;
                if (daysRemaining <= 2) return EnumStatus.SHIPPED;
                if (daysRemaining <= 3) return EnumStatus.PENDING;
                break;
            case "Standard":
            default:
                if (daysRemaining <= 0) return EnumStatus.DELIVERED;
                if (daysRemaining <= 1) return EnumStatus.OUT_FOR_DELIVERY;
                if (daysRemaining <= 5) return EnumStatus.SHIPPED;
                if (daysRemaining <= 7) return EnumStatus.PENDING;
                break;
        }
        return EnumStatus.PENDING;
    }

}
