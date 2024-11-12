package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SecurityConfig {

    private static SecurityConfig instance;

    private SecurityConfig() {

    }

    public static synchronized SecurityConfig getInstance() {
        if (instance == null) {
            instance = new SecurityConfig();
        }
        return instance;
    }

    public String hashPassword(String password) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        md.update(password.getBytes());
        byte[] digest = md.digest();
        return bytesToHex(digest);
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
