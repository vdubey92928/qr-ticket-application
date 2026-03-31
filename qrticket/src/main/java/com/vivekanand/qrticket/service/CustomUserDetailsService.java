package com.vivekanand.qrticket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.vivekanand.qrticket.entity.AppUser;
import com.vivekanand.qrticket.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        AppUser user = repo.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));
 
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name()) // 🔥 important
                .build();
    }
}