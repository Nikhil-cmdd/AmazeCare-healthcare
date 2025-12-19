package com.amazecare.model;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@Entity 
@Table (name = "asset")
public class Asset {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated (EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Status status = Status.AVAILABLE;

    private String description;

    public enum Category {
        LAPTOP, ACCESS_CARD, OTHER
    }

    public enum Status {
        AVAILABLE, CANCELLED
    }

}
