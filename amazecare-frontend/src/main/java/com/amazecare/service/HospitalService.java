package com.amazecare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.model.Hospital;
import com.amazecare.repository.HospitalRepository;

@Service
public class HospitalService {
    @Autowired private HospitalRepository hospitalRepository;

    public Hospital create(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public List<Hospital> getByCity(String city) {
        return hospitalRepository.findByCityIgnoreCase(city);
    }

    public List<Hospital> getByCityAndLocation(String city, String location) {
        return hospitalRepository.findByCityIgnoreCaseAndLocationIgnoreCase(city, location);
    }
}