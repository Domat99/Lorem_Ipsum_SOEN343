package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "delivery")
public class Delivery {

    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;
    private ObjectId userId;
    private ObjectId packageId;
    private String originAddress;
    private String destinationAddress;
    private double distance;
    private LocalDate deliveryDate;
    private int trackingNumber;
    private EnumStatus status;
    private double estimatedPrice;
    private String deliveryOption;
    private boolean insurance;
    private boolean specialHandling;
    private boolean signatureRequired;

    public Delivery(ObjectId id, ObjectId packageId, String originAddress, String destinationAddress, double distance, LocalDate deliveryDate, int trackingNumber, EnumStatus status, boolean insurance, boolean specialHandling, boolean signatureRequired) {
        this.id = id;
        this.packageId = packageId;
        this.originAddress = originAddress;
        this.destinationAddress = destinationAddress;
        this.distance = distance;
        this.deliveryDate = deliveryDate;
        this.trackingNumber = trackingNumber;
        this.status = status;
        this.insurance = insurance;
        this.specialHandling = specialHandling;
        this.signatureRequired = signatureRequired;
    }

    public Delivery() {

    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getPackageId() {
        return packageId;
    }

    public void setPackageId(ObjectId packageId) {
        this.packageId = packageId;
    }

    public String getOriginAddress() {
        return originAddress;
    }

    public void setOriginAddress(String originAddress) {
        this.originAddress = originAddress;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public int getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(int trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public EnumStatus getStatus() {
        return status;
    }

    public void setStatus(EnumStatus status) {
        this.status = status;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public double getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(double estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public String getDeliveryOption() {
        return deliveryOption;
    }

    public void setDeliveryOption(String deliveryOption) {
        this.deliveryOption = deliveryOption;
    }

    public boolean isInsurance() {
        return insurance;
    }

    public void setInsurance(boolean insurance) {
        this.insurance = insurance;
    }

    public boolean isSpecialHandling() {
        return specialHandling;
    }

    public void setSpecialHandling(boolean specialHandling) {
        this.specialHandling = specialHandling;
    }

    public boolean isSignatureRequired() {
        return signatureRequired;
    }

    public void setSignatureRequired(boolean signatureRequired) {
        this.signatureRequired = signatureRequired;
    }
}
