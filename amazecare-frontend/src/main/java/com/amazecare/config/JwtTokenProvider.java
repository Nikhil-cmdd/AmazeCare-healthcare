package com.amazecare.config;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.amazecare.model.User;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Base64;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
public class JwtTokenProvider {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateToken(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("role", user.getRole().name());

        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS512, getSigningKey())
                .compact();
    }


    public String getUsernameFromToken(String token) {
        return Jwts.parser()
        		   .setSigningKey(getSigningKey())
                   .parseClaimsJws(token)
                   .getBody()
                   .getSubject();
    }


    public boolean validateToken(String token) {
        try {
        	Jwts.parser().setSigningKey(getSigningKey())
        	.parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
        	System.out.println("Invalid JWT: " + e.getMessage());
            return false;
        }
    }
    
    private SecretKey getSigningKey() {
        return new SecretKeySpec(jwtSecret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS512.getJcaName());
    }
}
