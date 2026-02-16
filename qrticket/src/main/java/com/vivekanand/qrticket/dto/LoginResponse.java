package com.vivekanand.qrticket.dto;

import com.vivekanand.qrticket.enums.LoginRole;

public class LoginResponse {

    private String token;
    private LoginRole role;
    private String message;
    private boolean success;

    public LoginResponse(String token, LoginRole role, String message, boolean success) {
        this.token = token;
        this.role = role;
        this.message = message;
        this.success = success;
    }

    // Getters
    public String getToken() { return token; }
    public LoginRole getRole() { return role; }
    public String getMessage() { return message; }
    public boolean isSuccess() { return success; }
}
