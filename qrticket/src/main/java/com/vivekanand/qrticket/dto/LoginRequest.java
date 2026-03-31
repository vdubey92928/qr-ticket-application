package com.vivekanand.qrticket.dto;

//import com.vivekanand.qrticket.enums.LoginRole;

public class LoginRequest {

    private String username;
    private String password;
//    private LoginRole role;

    public LoginRequest() {}

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
//        this.role = role;
    }

    // Getters
    public String getUsername() { return username; }
    public String getPassword() { return password; }
//    public LoginRole getRole() { return role; }

    // Setters
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
//    public void setRole(LoginRole role) { this.role = role; }
}
