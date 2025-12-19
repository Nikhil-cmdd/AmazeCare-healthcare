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

import com.amazecare.model.Hospital;
import com.amazecare.repository.HospitalRepository;

@RestController 
@RequestMapping ("/api/hospitals")
public class HospitalController {

    @Autowired private HospitalRepository hospitalRepository;

    @PostMapping 
    public Hospital addHospital(@RequestBody Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    @GetMapping("/city")
    public List<Hospital> getByCity(@RequestParam String city) {
        return hospitalRepository.findByCityIgnoreCase(city);
    }

    @GetMapping("/location")
    public List<Hospital> getByCityAndLocation(@RequestParam String city, @RequestParam String location) {
        return hospitalRepository.findByCityIgnoreCaseAndLocationIgnoreCase(city, location);
    }
    
    @GetMapping
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteHospital(@PathVariable Long id) {
        hospitalRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long id, @RequestBody Hospital updated) {
        Hospital hospital = hospitalRepository.findById(id).orElseThrow();
        hospital.setName(updated.getName());
        hospital.setCity(updated.getCity());
        hospital.setLocation(updated.getLocation());
        return ResponseEntity.ok(hospitalRepository.save(hospital));
    }

}
