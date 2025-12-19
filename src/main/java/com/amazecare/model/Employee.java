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
@Table (name = "employee")
public class Employee {
    @Id 
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn (name = "id")
    private User user;

    private String fullName;
    private String department;

    @Column (name = "contact_number")
    private String contactNumber;
    
    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

}
