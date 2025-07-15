package com.project.back_end.services;

import org.springframework.stereotype.Service;
import com.project.back_end.models.Appointment;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private List<Appointment> appointments = new ArrayList<>();

    // Book a new appointment
    public Appointment bookAppointment(Appointment appointment) {
        appointments.add(appointment);
        return appointment;
    }

    // Get appointments by doctor and date
    public List<Appointment> getAppointmentsByDoctorAndDate(Long doctorId, String date) {
        return appointments.stream()
                .filter(a -> a.getDoctorId().equals(doctorId) && a.getAppointmentTime().startsWith(date))
                .toList();
    }
}