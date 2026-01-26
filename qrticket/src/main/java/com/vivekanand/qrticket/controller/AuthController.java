package com.vivekanand.qrticket.controller;

//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vivekanand.qrticket.dto.LoginRequest;
import com.vivekanand.qrticket.dto.LoginResponse;
//import com.vivekanand.qrticket.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

//    private final AuthenticationManager authenticationManager;
//    private final JwtUtil jwtUtil;

//    public AuthController(AuthenticationManager authenticationManager,
//                          JwtUtil jwtUtil) {
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getUsername(),
//                        request.getPassword()
//                )
//        );

//        String role = authentication.getAuthorities()
//                .stream()
//                .map(GrantedAuthority::getAuthority)
//                .findFirst()
//                .orElse("");

//        role = role.replace("ROLE_", "");

//        String token = jwtUtil.generateToken(
//                request.getUsername(),
//                role
//        );

        return new LoginResponse("bhskvwh", "GATE");
    }
}
