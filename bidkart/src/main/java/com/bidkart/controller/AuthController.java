package com.bidkart.controller;

import com.bidkart.model.User;
import com.bidkart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Gmail validation
    private final Pattern emailPattern = Pattern.compile("^[A-Za-z0-9+_.-]+@gmail\\.com$");

    // Strong password validation
    private final Pattern passwordPattern =
            Pattern.compile("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$");

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        if (!emailPattern.matcher(user.getEmail()).matches()) {
            return "Only Gmail allowed ❌";
        }

        if (!passwordPattern.matcher(user.getPassword()).matches()) {
            return "Weak password ❌";
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists ❌";
        }

        userRepository.save(user);
        return "User registered successfully ✅";
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {

        return userRepository.findByEmail(user.getEmail())
                .filter(u -> u.getPassword().equals(user.getPassword()))
                .map(u -> java.util.Map.of(
                        "message", "Login successful",
                        "userId", u.getId(),
                        "token", "dummy-jwt-token"
                ))
                .orElse(java.util.Map.of(
                        "message", "Invalid credentials"
                ));
    }
}