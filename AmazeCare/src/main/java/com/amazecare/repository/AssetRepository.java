package com.amazecare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amazecare.model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByCategory(Asset.Category category);
}
