package com.amazecare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.amazecare.config.JwtTokenProvider;
import com.amazecare.dto.LoginRequest;
import com.amazecare.dto.LoginResponse;
import com.amazecare.model.User;
import com.amazecare.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private JwtTokenProvider tokenProvider;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserRepository UserRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(authentication);

        String username = loginRequest.getUsername();
        User user = UserRepository.findByUsername(username).orElseThrow();
        String role = user.getRole().name();

        return ResponseEntity.ok(new LoginResponse(token, role));
    }
}
