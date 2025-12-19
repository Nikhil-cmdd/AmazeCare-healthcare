package com.amazecare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.model.Employee;
import com.amazecare.repository.EmployeeRepository;

@Service
public class EmployeeService {
    @Autowired private EmployeeRepository employeeRepository;

    public Employee create(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public List<Employee> searchByName(String name) {
        return employeeRepository.findByFullNameContainingIgnoreCase(name);
    }
    
    public Employee findByUserId(Long userId) {
        return employeeRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Employee not found for user ID " + userId));
    }


}