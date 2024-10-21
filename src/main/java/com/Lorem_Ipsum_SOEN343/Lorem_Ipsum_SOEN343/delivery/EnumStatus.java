package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery;

public enum EnumStatus {
    PENDING, SHIPPED, OUT_FOR_DELIVERY, DELIVERED;

    public String getStatusDescription() {
        switch (this) {
            case PENDING:
                return "The order is pending.";
            case SHIPPED:
                return "The package has been shipped.";
            case OUT_FOR_DELIVERY:
                return "The package is out for final delivery.";
            case DELIVERED:
                return "The package has been delivered.";
            default:
                return "Unknown status.";
        }
    }



}
