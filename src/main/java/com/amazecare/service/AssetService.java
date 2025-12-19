package com.amazecare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazecare.model.Asset;
import com.amazecare.repository.AssetRepository;

@Service
public class AssetService {
    @Autowired private AssetRepository assetRepository;

    public Asset create(Asset asset) {
        return assetRepository.save(asset);
    }

    public List<Asset> getAll() {
        return assetRepository.findAll();
    }

    public List<Asset> getByCategory(Asset.Category category) {
        return assetRepository.findByCategory(category);
    }

    public Optional<Asset> getById(Long id) {
        return assetRepository.findById(id);
    }

    public void delete(Long id) {
        assetRepository.deleteById(id);
    }
}