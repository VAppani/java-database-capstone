package com.project.back_end.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.back_end.models.Doctor;
import com.project.back_end.services.DoctorService;
import java.util.List;

/**
 * Controller for handling doctor-related operations.
 * Manages availability retrieval and login validation.
 */
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    /**
     * Retrieves a doctor's availability based on ID, date, and user context.
     * @param user The user type (e.g., admin or doctor)
     * @param doctorId The ID of the doctor
     * @param date The date to check availability
     * @param token The JWT token for authentication
     * @return List of available time slots or 404 if not found
     */
    @GetMapping("/availability/{user}/{doctorId}/{date}/{token}")
    public ResponseEntity<List<String>> getDoctorAvailability(
            @PathVariable String user,
            @PathVariable Long doctorId,
            @PathVariable String date,
            @PathVariable String token) {
        // Validate token (simplified; integrate with TokenValidationService later)
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Fetch availability (dummy implementation; replace with service logic)
        List<String> availability = doctorService.getAvailability(doctorId, date);
        if (availability != null && !availability.isEmpty()) {
            return ResponseEntity.ok(availability);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Validates a doctor's login based on token and credentials.
     * @param token The JWT token containing user credentials
     * @return ResponseEntity with doctor details or 401 if invalid
     */
    @GetMapping("/login/{token}")
    public ResponseEntity<Doctor> validateDoctorLogin(@PathVariable String token) {
        // Validate token (simplified; integrate with TokenValidationService later)
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        // Fetch doctor (dummy implementation; replace with service logic)
        Doctor doctor = doctorService.validateLogin(token);
        if (doctor != null) {
            return ResponseEntity.ok(doctor);
        }
        return ResponseEntity.status(401).build();
    }
}