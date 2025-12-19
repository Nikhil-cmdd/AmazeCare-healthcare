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

import com.amazecare.model.Asset;
import com.amazecare.repository.AssetRepository;

@RestController 
@RequestMapping ("/api/assets")
public class AssetController {

    @Autowired private AssetRepository assetRepository;

    @PostMapping 
    public Asset addAsset(@RequestBody Asset asset) {
        return assetRepository.save(asset);
    }

    @PutMapping ("/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @RequestBody Asset asset) {
        Asset updated = assetRepository.findById(id).orElseThrow();
        updated.setName(asset.getName());
        updated.setCategory(asset.getCategory());
        updated.setStatus(asset.getStatus());
        updated.setDescription(asset.getDescription());
        return ResponseEntity.ok(assetRepository.save(updated));
    }

    @DeleteMapping("/{id}")
    public void deleteAsset(@PathVariable Long id) {
        assetRepository.deleteById(id);
    }

    @GetMapping 
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    @GetMapping("/category")
    public List<Asset> getByCategory(@RequestParam Asset.Category category) {
        return assetRepository.findByCategory(category);
    }
}
