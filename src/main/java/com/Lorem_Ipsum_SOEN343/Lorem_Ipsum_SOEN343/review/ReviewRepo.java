package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.review;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepo extends MongoRepository<Review, ObjectId> {
    Review findByDeliveryId(ObjectId deliveryId);
}
