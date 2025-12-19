package com.amazecare.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data 
@Entity 
@Table (name = "doctor")
public class Doctor {
    @Id 
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn (name = "id")
    private User user;

    @Column (name = "full_name", nullable = false)
    private String fullName;

    private String specialty;
    private Integer experience;
    private String qualification;
    private String designation;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

}
