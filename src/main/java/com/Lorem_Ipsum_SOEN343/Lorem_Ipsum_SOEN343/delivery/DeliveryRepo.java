package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryRepo extends MongoRepository<Delivery, ObjectId> {
    boolean existsByTrackingNumber(int trackingNumber);
    Optional<Delivery> findByTrackingNumber(int trackingNumber);
}
