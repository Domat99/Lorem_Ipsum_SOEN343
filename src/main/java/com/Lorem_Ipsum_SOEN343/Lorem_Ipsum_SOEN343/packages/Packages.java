package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages;

import org.bson.types.ObjectId;

public class Packages {

    private ObjectId id;
    private double height;
    private double length;
    private double width;
    private double weight;

    public Packages(ObjectId id, double height, double length, double width, double weight) {
        this.id = id;
        this.height = height;
        this.length = length;
        this.width = width;
        this.weight = weight;
    }

    public ObjectId getId() {
        return this.id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public double getHeight() {
        return this.height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getLength() {
        return this.length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getWidth() {
        return this.width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getWeight() {
        return this.weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }
}
