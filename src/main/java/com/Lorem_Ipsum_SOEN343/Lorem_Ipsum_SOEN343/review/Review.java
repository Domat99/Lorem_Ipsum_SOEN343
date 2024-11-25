package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.review;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "review")
public class Review {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private ObjectId deliveryId;
    private double rating;
    private String description;

    public Review() {
    }

    public Review(ObjectId id, ObjectId deliveryId, double rating, String description) {
        this.id = id;
        this.deliveryId = deliveryId;
        this.rating = rating;
        this.description = description;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(ObjectId deliveryId) {
        this.deliveryId = deliveryId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
