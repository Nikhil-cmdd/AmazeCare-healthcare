package com.amazecare.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data 
@Entity 
@Table (name = "asset_request")
public class AssetRequest {
    @Id 
    @GeneratedValue (strategy = GenerationType .IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn (name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    @Enumerated (EnumType.STRING)
    private Status status = Status.PENDING;

    @Column (name = "request_date")
    private Timestamp  requestDate;

    public enum Status {
        PENDING, APPROVED, REJECTED
    }

}
