package com.vivekanand.qrticket.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.vivekanand.qrticket.util.JwtFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	public SecurityFilterChain filterChains(HttpSecurity http) throws Exception{
	
		http.exceptionHandling(ex -> ex
			    .authenticationEntryPoint((request, response, authException) -> {
			        response.setContentType("application/json");
			        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			        response.getWriter().write(
			            "{\"success\":false,\"message\":\"Unauthorized\"}"
			        );
			    })
			);
		http
			.csrf(csrf->csrf.disable())
			.cors(cors->{})
			.formLogin(form ->form.disable())
			.httpBasic(basic->basic.disable())
			.authorizeHttpRequests(auth->auth
				.requestMatchers("/api/auth/**").permitAll()
				.requestMatchers("/api/payments/create-order").permitAll()
				.anyRequest().authenticated()
			)
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOriginPatterns(List.of("*"));
		config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		
		return source;
	}
	
	@Bean
	public AuthenticationManager authenticationManager(
	        AuthenticationConfiguration config) throws Exception {
	    return config.getAuthenticationManager();
	}
}
