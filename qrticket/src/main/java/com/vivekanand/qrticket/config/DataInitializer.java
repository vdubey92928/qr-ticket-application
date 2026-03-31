package com.vivekanand.qrticket.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.vivekanand.qrticket.entity.AppUser;
import com.vivekanand.qrticket.enums.LoginRole;
import com.vivekanand.qrticket.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(UserRepository repo, PasswordEncoder encoder) {
        return args -> {

            if (repo.count() == 0) { // avoid duplicate insert

                repo.save(new AppUser("admin", encoder.encode("admin123"), LoginRole.ADMIN));
                repo.save(new AppUser("gate", encoder.encode("gate123"), LoginRole.GATE));
                repo.save(new AppUser("museum", encoder.encode("museum123"), LoginRole.MUSEUM));

                System.out.println("🔥 Test users inserted");
            }
        };
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}