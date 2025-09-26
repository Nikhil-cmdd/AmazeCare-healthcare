CREATE DATABASE amazecare;
USE amazecare;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'DOCTOR', 'PATIENT', 'EMPLOYEE') NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users ADD COLUMN contact_number VARCHAR(20);
ALTER TABLE users ADD COLUMN gender VARCHAR(10);

CREATE TABLE admin (
    id BIGINT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id)
);

CREATE TABLE employee (
    id BIGINT PRIMARY KEY,
    full_name VARCHAR(100),
    department VARCHAR(100),
    contact_number VARCHAR(20),
    FOREIGN KEY (id) REFERENCES users(id)
);

ALTER TABLE employee ADD COLUMN hospital_id BIGINT, ADD CONSTRAINT fk_employee_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id);

CREATE TABLE asset (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM('LAPTOP', 'ACCESS_CARD', 'OTHER') NOT NULL,
    status ENUM('AVAILABLE', 'CANCELLED') DEFAULT 'AVAILABLE',
    description TEXT
);

CREATE TABLE asset_request (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    asset_id BIGINT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(id),
    FOREIGN KEY (asset_id) REFERENCES asset(id)
);

CREATE TABLE hospital (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL
);

CREATE TABLE doctor (
    id BIGINT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    experience INT,
    qualification VARCHAR(100),
    designation VARCHAR(100),
    hospital_id BIGINT,
    FOREIGN KEY (id) REFERENCES users(id),
    FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

CREATE TABLE patient (
    id BIGINT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    dob DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    contact_number VARCHAR(20),
    medical_history TEXT,
    FOREIGN KEY (id) REFERENCES users(id)
);

CREATE TABLE appointment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    symptoms TEXT,
    preferred_date DATE,
    preferred_time TIME,
    status ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE consultation (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_id BIGINT NOT NULL,
    symptoms TEXT,
    physical_exam TEXT,
    treatment_plan TEXT,
    recommended_tests TEXT,
    prescription TEXT,
    FOREIGN KEY (appointment_id) REFERENCES appointment(id)
);

INSERT INTO users (username, password, role, email) VALUES
('admin.narayan', 'admin123', 'ADMIN', 'narayan.admin@gmail.com'),
('dr.shreya', 'doctor123', 'DOCTOR', 'shreya.doc@gmail.com'),
('ravi.pat', 'ravi123', 'PATIENT', 'ravi.p@gmail.com'),
('deepa.emp', 'deepa123', 'EMPLOYEE', 'deepa@gmail.com');
select * from users;
select * from doctor;
select * from admin;
select * from appointment;
select * from patient;
select * from employee;
select * from hospital;
select * from admin;
select * from asset;
select * from consultation;


use amazecare;
INSERT INTO admin (id, full_name) VALUES
(1, 'Narayan Deshmukh');

INSERT INTO employee (id, full_name, department, contact_number) VALUES
(4, 'Deepa Mehta', 'IT Support', '9876543210');

INSERT INTO asset (name, category, status, description) VALUES
('Dell Latitude 7420', 'LAPTOP', 'AVAILABLE', '14-inch business laptop'),
('RFID Access Card', 'ACCESS_CARD', 'AVAILABLE', 'Access to hospital wings'),
('Blood Pressure Machine', 'OTHER', 'AVAILABLE', 'For outpatient checkups');

INSERT INTO asset_request (employee_id, asset_id, status) VALUES
(4, 1, 'PENDING'),
(4, 2, 'APPROVED');

INSERT INTO hospital (name, city, location) VALUES
('Ruby Hall Clinic', 'Pune', 'Bund Garden Road'),
('Fortis Hospital', 'Mumbai', 'Mulund West'),
('AIIMS', 'Delhi', 'Ansari Nagar');

INSERT INTO doctor (id, full_name, specialty, experience, qualification, designation, hospital_id) VALUES
(2, 'Dr. Shreya Kulkarni', 'Cardiology', 12, 'MD (Cardiology)', 'Senior Consultant', 1);

INSERT INTO patient (id, full_name, dob, gender, contact_number, medical_history) VALUES
(3, 'Ravi Patil', '1990-05-10', 'MALE', '9012345678', 'Diabetes Type II');
select * from patient;
INSERT INTO appointment (doctor_id, patient_id, symptoms, preferred_date, preferred_time, status) VALUES
(2, 3, 'Chest pain and breathlessness', '2025-07-10', '10:00:00', 'CONFIRMED');

INSERT INTO consultation (appointment_id, symptoms, physical_exam, treatment_plan, recommended_tests, prescription) VALUES
(1, 'Chest pain and breathlessness', 'BP: 140/90, Pulse: 96', 'Prescribed rest & ECG', 'ECG, Lipid Profile', 'Aspirin 0-0-1 AF');
