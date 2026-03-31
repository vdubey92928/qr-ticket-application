package com.vivekanand.qrticket.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.vivekanand.qrticket.dto.LoginRequest;
import com.vivekanand.qrticket.dto.LoginResponse;
import com.vivekanand.qrticket.enums.LoginRole;
import com.vivekanand.qrticket.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private AuthenticationManager authManager;

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

	    try {
	        Authentication auth = authManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        request.getUsername(),
	                        request.getPassword()
	                )
	        );

	        UserDetails user = (UserDetails) auth.getPrincipal();

	        String role = user.getAuthorities().iterator().next().getAuthority();

	        String token = jwtUtil.generateToken(user.getUsername(), role);
	        return ResponseEntity.ok(
	                new LoginResponse(
	                        token, // JWT later
	                        LoginRole.valueOf(role.replace("ROLE_", "")),
	                        "Login successful",
	                        true
	                )
	        );

	    } catch (Exception e) {
	        return ResponseEntity.status(401)
	                .body(new LoginResponse(null, null, e.getMessage(), false));
	    }
	}
	
	@GetMapping("/validate")
	public ResponseEntity<?> validate(Authentication authentication) {

	    if (authentication == null || !authentication.isAuthenticated()) {
	        return ResponseEntity.status(401).body("Invalid token");
	    }

	    return ResponseEntity.ok("Valid token");
	}
   
}
