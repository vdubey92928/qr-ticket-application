package com.vivekanand.qrticket.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vivekanand.qrticket.dto.LoginRequest;
import com.vivekanand.qrticket.dto.LoginResponse;
import com.vivekanand.qrticket.enums.LoginRole;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String ADMIN_USER = "admin";
    private static final String ADMIN_PASS = "admin123";

    private static final String GATE_USER = "gate";
    private static final String GATE_PASS = "gate123";

    private static final String MUSEUM_USER = "museum";
    private static final String MUSEUM_PASS = "museum123";

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        // Safety check
        if (request.getRole() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(null, null, "Role not provided", false));
        }

        // ADMIN LOGIN
        if (LoginRole.ADMIN.equals(request.getRole()) &&
                ADMIN_USER.equals(request.getUsername()) &&
                ADMIN_PASS.equals(request.getPassword())) {
            return ResponseEntity.ok(successResponse(LoginRole.ADMIN));
        }

        // GATE LOGIN
        if (LoginRole.GATE.equals(request.getRole()) &&
                GATE_USER.equals(request.getUsername()) &&
                GATE_PASS.equals(request.getPassword())) {
            return ResponseEntity.ok(successResponse(LoginRole.GATE));
        }

        // MUSEUM LOGIN
        if (LoginRole.MUSEUM.equals(request.getRole()) &&
                MUSEUM_USER.equals(request.getUsername()) &&
                MUSEUM_PASS.equals(request.getPassword())) {
            return ResponseEntity.ok(successResponse(LoginRole.MUSEUM));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponse(null, null, "Invalid username or password", false));
    }

    private LoginResponse successResponse(LoginRole role) {
        String token = "SESSION-" + UUID.randomUUID();

        return new LoginResponse(
                token,
                role,
                "Login successful",
                true
        );
    }
}
