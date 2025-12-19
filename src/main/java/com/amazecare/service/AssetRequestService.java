package com.amazecare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.model.AssetRequest;
import com.amazecare.repository.AssetRequestRepository;

@Service
public class AssetRequestService {
    @Autowired private AssetRequestRepository requestRepository;

    public AssetRequest create(AssetRequest request) {
        return requestRepository.save(request);
    }

    public List<AssetRequest> getAll() {
        return requestRepository.findAll();
    }
}