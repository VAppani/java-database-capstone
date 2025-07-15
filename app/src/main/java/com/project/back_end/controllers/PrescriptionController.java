package com.project.back_end.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.project.back_end.models.Prescription;

@RestController
public class PrescriptionController {

    @PostMapping("/api/prescriptions")
    public Prescription savePrescription(@RequestBody Prescription prescription) {
        // Dummy save logic
        return prescription;
    }
}