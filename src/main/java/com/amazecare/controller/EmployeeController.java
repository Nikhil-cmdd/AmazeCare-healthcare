package com.amazecare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazecare.dto.EmployeeResponse;
import com.amazecare.model.Employee;
import com.amazecare.model.User;
import com.amazecare.repository.EmployeeRepository;
import com.amazecare.repository.UserRepository;
import com.amazecare.service.EmployeeService;

@RestController 
@RequestMapping ("/api/employees")
public class EmployeeController {

    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private EmployeeService employeeService;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;


    @PostMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employeeRequest) {
        User user = employeeRequest.getUser();

        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }

        user.setRole(User.Role.EMPLOYEE);
        user.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        Employee employee = new Employee();
        employee.setUser(savedUser);
        employee.setFullName(employeeRequest.getFullName());
        employee.setDepartment(employeeRequest.getDepartment());
        employee.setContactNumber(employeeRequest.getContactNumber());
        employee.setHospital(employeeRequest.getHospital());

        return ResponseEntity.ok(employeeRepository.save(employee));
    }


    @GetMapping 
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/search")
    public List<Employee> searchByName(@RequestParam String name) {
        return employeeRepository.findByFullNameContainingIgnoreCase(name);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getById(@PathVariable Long id) {
        return employeeRepository.findById(id)
            .map(employee -> {
                EmployeeResponse dto = new EmployeeResponse();
                dto.setId(employee.getId());
                dto.setFullName(employee.getFullName());
                dto.setDepartment(employee.getDepartment());
                dto.setContactNumber(employee.getContactNumber());

                if (employee.getUser() != null) {
                    dto.setEmail(employee.getUser().getEmail());
                    dto.setGender(employee.getUser().getGender() != null ? employee.getUser().getGender().name() : null);
                    dto.setUsername(employee.getUser().getUsername());
                }

                dto.setHospitalName(employee.getHospital() != null ? employee.getHospital().getName() : null);

                return ResponseEntity.ok(dto);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public Employee getByUserId(@PathVariable Long userId) {
        return employeeService.findByUserId(userId);
    }


    
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
    	return employeeRepository.findById(id)
    			.map(existingEmployee -> {
    				existingEmployee.setFullName(updatedEmployee.getFullName());
    				existingEmployee.setDepartment(updatedEmployee.getDepartment());
    				existingEmployee.setContactNumber(updatedEmployee.getContactNumber());
    				
    				if (updatedEmployee.getHospital() != null) {
    	                existingEmployee.setHospital(updatedEmployee.getHospital());
    	            }
                
    				User user = existingEmployee.getUser();
    				User incomingUser = updatedEmployee.getUser();

    				if (incomingUser != null) {
    					user.setEmail(incomingUser.getEmail());
    					user.setContactNumber(incomingUser.getContactNumber());
    					user.setGender(incomingUser.getGender());
    					user.setUsername(incomingUser.getUsername());
    					if (incomingUser.getPassword() != null && !incomingUser.getPassword().isBlank()) {
    						user.setPassword(incomingUser.getPassword()); // Ideally hash it here
    						}
    					}

    				existingEmployee.setUser(user);
    				return ResponseEntity.ok(employeeRepository.save(existingEmployee));
    				})
    			.orElse(ResponseEntity.notFound().build());
    	}

    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow();
        User user = employee.getUser();

        employeeRepository.delete(employee);
        userRepository.delete(user);

        return ResponseEntity.ok("Employee and user deleted successfully.");
    }

}
