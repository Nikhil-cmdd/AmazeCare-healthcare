package com.amazecare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazecare.model.Admin;
import com.amazecare.model.User;
import com.amazecare.repository.AdminRepository;
import com.amazecare.repository.UserRepository;

@RestController 
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired private AdminRepository adminRepository;
    @Autowired private UserRepository userRepository;


    @PostMapping 
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }

    @GetMapping 
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @GetMapping("/search")
    public List<Admin> searchByName(@RequestParam String name) {
        return adminRepository.findByFullNameContainingIgnoreCase(name);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        Admin admin = adminRepository.findById(id).orElseThrow();
        User user = admin.getUser();
        adminRepository.delete(admin);
        userRepository.delete(user);
        return ResponseEntity.ok("Admin and user deleted successfully.");
    }


    @PutMapping ("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin updated) {
        Admin admin = adminRepository.findById(id).orElseThrow();
        admin.setFullName(updated.getFullName());
        return ResponseEntity.ok(adminRepository.save(admin));
    }

}
