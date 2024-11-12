package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.User;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user")
public class User {

    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;
    private String name;
    private String email;
    private String password;
    private List<ObjectId> deliveries = new ArrayList<>();


    public User(ObjectId id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ObjectId> getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(List<ObjectId> deliveries) {
        this.deliveries = deliveries;
    }

    public void addDelivery(ObjectId deliveryId) {
        this.deliveries.add(deliveryId);
    }
}
