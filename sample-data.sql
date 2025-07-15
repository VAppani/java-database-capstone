INSERT INTO admin (username, email, password) VALUES
('admin1', 'admin1@smartclinic.com', 'adminpass123');

INSERT INTO doctor (first_name, last_name, specialization, email, password) VALUES
('John', 'Doe', 'Cardiology', 'john.doe@smartclinic.com', 'doctorpass123'),
('Jane', 'Smith', 'Pediatrics', 'jane.smith@smartclinic.com', 'doctorpass123');

-- Insert into patient
INSERT INTO patient (first_name, last_name, email, phone, date_of_birth) VALUES
('Alice', 'Johnson', 'alice.j@smartclinic.com', '1234567890', '1990-05-15'),
('Bob', 'Brown', 'bob.b@smartclinic.com', '0987654321', '1985-09-22');

-- Insert into appointment
INSERT INTO appointment (patient_id, doctor_id, appointment_time, status) VALUES
(1, 1, '2025-07-15 10:00:00', 'Scheduled'),
(2, 2, '2025-07-15 14:00:00', 'Scheduled');

-- Insert into doctor_available_times (for Doctor's availableTimes)
INSERT INTO doctor_available_times (doctor_id, available_times) VALUES
(1, '2025-07-15 09:00:00'),
(2, '2025-07-15 13:00:00');



