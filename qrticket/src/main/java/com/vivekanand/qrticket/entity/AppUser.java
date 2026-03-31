package com.vivekanand.qrticket.entity;

import com.vivekanand.qrticket.enums.LoginRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

@Entity
public class AppUser {

    @Id
    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private LoginRole role;
    
    public AppUser(String username, String password, LoginRole role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
    
    public AppUser() {
        
    }

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public LoginRole getRole() {
		return role;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setRole(LoginRole role) {
		this.role = role;
	}
    
    
}
