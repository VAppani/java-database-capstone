USE cms;

DELIMITER //

DROP PROCEDURE IF EXISTS GetDailyAppointmentReportByDoctor;
CREATE PROCEDURE GetDailyAppointmentReportByDoctor(IN p_date DATE)
BEGIN
    SELECT 
        d.first_name AS doctor_first_name,
        d.last_name AS doctor_last_name,
        COUNT(a.id) AS appointment_count,
        GROUP_CONCAT(CONCAT(p.first_name, ' ', p.last_name) SEPARATOR ', ') AS patient_names
    FROM 
        doctor d
    LEFT JOIN 
        appointment a ON d.id = a.doctor_id
    LEFT JOIN 
        patient p ON a.patient_id = p.id
    WHERE 
        DATE(a.appointment_time) = p_date
    GROUP BY 
        d.id, d.first_name, d.last_name
    ORDER BY 
        appointment_count DESC;
END //

DROP PROCEDURE IF EXISTS GetDoctorWithMostPatientsByMonth;
CREATE PROCEDURE GetDoctorWithMostPatientsByMonth(IN p_year INT, IN p_month INT)
BEGIN
    WITH PatientCount AS (
        SELECT 
            d.id AS doctor_id,
            d.first_name AS doctor_first_name,
            d.last_name AS doctor_last_name,
            COUNT(DISTINCT a.patient_id) AS patient_count
        FROM 
            doctor d
        LEFT JOIN 
            appointment a ON d.id = a.doctor_id
        WHERE 
            YEAR(a.appointment_time) = p_year 
            AND MONTH(a.appointment_time) = p_month
        GROUP BY 
            d.id, d.first_name, d.last_name
    )
    SELECT 
        doctor_first_name,
        doctor_last_name,
        patient_count
    FROM 
        PatientCount
    WHERE 
        patient_count = (SELECT MAX(patient_count) FROM PatientCount)
    LIMIT 1;
END //

DROP PROCEDURE IF EXISTS GetDoctorWithMostPatientsByYear;
CREATE PROCEDURE GetDoctorWithMostPatientsByYear(IN p_year INT)
BEGIN
    WITH PatientCount AS (
        SELECT 
            d.id AS doctor_id,
            d.first_name AS doctor_first_name,
            d.last_name AS doctor_last_name,
            COUNT(DISTINCT a.patient_id) AS patient_count
        FROM 
            doctor d
        LEFT JOIN 
            appointment a ON d.id = a.doctor_id
        WHERE 
            YEAR(a.appointment_time) = p_year
        GROUP BY 
            d.id, d.first_name, d.last_name
    )
    SELECT 
        doctor_first_name,
        doctor_last_name,
        patient_count
    FROM 
        PatientCount
    WHERE 
        patient_count = (SELECT MAX(patient_count) FROM PatientCount)
    LIMIT 1;
END //

DELIMITER ;