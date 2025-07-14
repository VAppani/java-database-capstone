package com.project.back_end.models;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import java.time.LocalDate;
import java.util.List;

@Document(collection = "prescriptions")
public class Prescription {
    @Id
    private String id;

    @NotNull(message = "Prescription ID cannot be null")
    private String prescriptionId;

    @NotNull(message = "Patient ID cannot be null")
    private Long patientId;

    @NotNull(message = "Doctor ID cannot be null")
    private Long doctorId;

    @NotNull(message = "Date issued cannot be null")
    private LocalDate dateIssued;

    @NotNull(message = "Medications cannot be null")
    private List<Medication> medications;

    @Size(max = 200, message = "Notes must not exceed 200 characters")
    private String notes;

    // Nested class for medications
    public static class Medication {
        private String name;
        private String dosage;
        private String frequency;
        private String duration;

        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDosage() { return dosage; }
        public void setDosage(String dosage) { this.dosage = dosage; }
        public String getFrequency() { return frequency; }
        public void setFrequency(String frequency) { this.frequency = frequency; }
        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPrescriptionId() { return prescriptionId; }
    public void setPrescriptionId(String prescriptionId) { this.prescriptionId = prescriptionId; }
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public LocalDate getDateIssued() { return dateIssued; }
    public void setDateIssued(LocalDate dateIssued) { this.dateIssued = dateIssued; }
    public List<Medication> getMedications() { return medications; }
    public void setMedications(List<Medication> medications) { this.medications = medications; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}