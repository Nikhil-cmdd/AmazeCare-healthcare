package com.amazecare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amazecare.model.AssetRequest;

public interface AssetRequestRepository extends JpaRepository<AssetRequest, Long> {
    List<AssetRequest> findByEmployeeId(Long employeeId);
    List<AssetRequest> findByAssetId(Long assetId);
}
