package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery;

import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages.Packages;
import org.bson.types.ObjectId;

import java.time.LocalDate;

public class Delivery {

    private ObjectId id;
    private Packages aPackage;
    private String originAddress;
    private String destinationAddress;
    private double distance;
    private LocalDate deliveryDate;
    private int trackingNumber;
    private EnumStatus status;

    public Delivery(ObjectId id, Packages aPackage, String originAddress, String destinationAddress, double distance, LocalDate deliveryDate, int trackingNumber, EnumStatus status) {
        this.id = id;
        this.aPackage = aPackage;
        this.originAddress = originAddress;
        this.destinationAddress = destinationAddress;
        this.distance = distance;
        this.deliveryDate = deliveryDate;
        this.trackingNumber = trackingNumber;
        this.status = status;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Packages getaPackage() {
        return aPackage;
    }

    public void setaPackage(Packages aPackage) {
        this.aPackage = aPackage;
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
}
