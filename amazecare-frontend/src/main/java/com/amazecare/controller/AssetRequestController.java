package com.amazecare.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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

import com.amazecare.model.AssetRequest;
import com.amazecare.repository.AssetRequestRepository;

@RestController 
@RequestMapping ("/api/asset-requests")
public class AssetRequestController {

    @Autowired private AssetRequestRepository assetRequestRepository;

    @PostMapping 
    public AssetRequest requestAsset(@RequestBody AssetRequest request) {
        request.setStatus(AssetRequest.Status.PENDING);
        request.setRequestDate(Timestamp.valueOf(LocalDateTime.now()));
        return assetRequestRepository.save(request);
    }

    @GetMapping 
    public List<AssetRequest> getAllRequests() {
        return assetRequestRepository.findAll();
    }
    
    @GetMapping("/employee/{id}")
    public List<AssetRequest> getByEmployeeId(@PathVariable Long id) {
        return assetRequestRepository.findByEmployeeId(id);
    }

    
    @PutMapping ("/{id}/status")
    public ResponseEntity<AssetRequest> updateStatus(@PathVariable Long id, @RequestParam AssetRequest.Status status) {
        AssetRequest request = assetRequestRepository.findById(id).orElseThrow();
        request.setStatus(status);
        return ResponseEntity.ok(assetRequestRepository.save(request));
    }

    
    @DeleteMapping("/{id}")
    public void deleteAssetRequest(@PathVariable Long id) {
        assetRequestRepository.deleteById(id);
    }

}
