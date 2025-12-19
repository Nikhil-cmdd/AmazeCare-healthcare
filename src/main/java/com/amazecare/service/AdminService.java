package com.amazecare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.model.Admin;
import com.amazecare.repository.AdminRepository;

@Service
public class AdminService {
    @Autowired private AdminRepository adminRepository;

    public Admin create(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAll() {
        return adminRepository.findAll();
    }

    public List<Admin> searchByName(String name) {
        return adminRepository.findByFullNameContainingIgnoreCase(name);
    }
}