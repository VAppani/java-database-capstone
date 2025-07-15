// doctorDashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const appointmentList = document.getElementById('appointmentList');
    const prescriptionDetails = document.getElementById('prescriptionContent');
    const appointmentSearch = document.getElementById('appointmentSearch');
    const dateFilter = document.getElementById('dateFilter');

    // Simulate logged-in doctor (replace with actual role from index.js later)
    const loggedInDoctorId = 1; // Assume Doctor John Doe (ID 1)

    // Dummy appointments data (replace with API call later)
    let appointments = [
        { id: 1, patientId: 1, doctorId: 1, appointmentTime: '2025-07-15 10:00:00', status: 'Scheduled' },
        { id: 2, patientId: 2, doctorId: 2, appointmentTime: '2025-07-15 14:00:00', status: 'Scheduled' },
        { id: 3, patientId: 3, doctorId: 3, appointmentTime: '2025-07-16 09:00:00', status: 'Scheduled' },
        { id: 4, patientId: 4, doctorId: 4, appointmentTime: '2025-07-16 11:00:00', status: 'Scheduled' },
        { id: 5, patientId: 1, doctorId: 4, appointmentTime: '2025-07-17 14:00:00', status: 'Scheduled' },
        { id: 6, patientId: 2, doctorId: 3, appointmentTime: '2025-07-17 15:00:00', status: 'Scheduled' }
    ];

    // Dummy prescriptions data (replace with MongoDB API call later)
    let prescriptions = [
        { prescriptionId: 'RX001', patientId: 1, doctorId: 1, dateIssued: '2025-07-15', medications: [{ name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' }], notes: 'Take with food.' },
        { prescriptionId: 'RX002', patientId: 2, doctorId: 2, dateIssued: '2025-07-15', medications: [{ name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed', duration: '5 days' }], notes: 'Avoid alcohol.' }
    ];

    // Display Appointments
    function displayAppointments(appointmentsToShow) {
        appointmentList.innerHTML = '';
        appointmentsToShow.forEach(appointment => {
            if (appointment.doctorId === loggedInDoctorId) {
                const appointmentCard = document.createElement('div');
                appointmentCard.className = 'appointment-card';
                appointmentCard.innerHTML = `
                    <h3>Appointment #${appointment.id}</h3>
                    <p>Patient: ${patientService.getPatientById(appointment.patientId)?.firstName} ${patientService.getPatientById(appointment.patientId)?.lastName}</p>
                    <p>Date/Time: ${new Date(appointment.appointmentTime).toLocaleString()}</p>
                    <p>Status: ${appointment.status}</p>
                    <button onclick="viewPrescription(${appointment.patientId})">View Prescriptions</button>
                `;
                appointmentList.appendChild(appointmentCard);
            }
        });
    }

    // Display Prescriptions
    window.viewPrescription = function (patientId) {
        const patientPrescriptions = prescriptions.filter(p => p.patientId === patientId && p.doctorId === loggedInDoctorId);
        prescriptionDetails.innerHTML = '';
        if (patientPrescriptions.length > 0) {
            patientPrescriptions.forEach(prescription => {
                const prescriptionDiv = document.createElement('div');
                prescriptionDiv.innerHTML = `
                    <h4>Prescription #${prescription.prescriptionId}</h4>
                    <p>Date Issued: ${new Date(prescription.dateIssued).toLocaleDateString()}</p>
                    <p>Medications: ${prescription.medications.map(m => `${m.name} (${m.dosage}, ${m.frequency}, ${m.duration})`).join(', ')}</p>
                    <p>Notes: ${prescription.notes}</p>
                `;
                prescriptionDetails.appendChild(prescriptionDiv);
            });
        } else {
            prescriptionDetails.innerHTML = '<p>No prescriptions found for this patient.</p>';
        }
    };

    // Initial Display
    displayAppointments(appointments);

    // Search Functionality
    appointmentSearch.addEventListener('input', () => {
        const searchTerm = appointmentSearch.value.toLowerCase();
        const filteredAppointments = appointments.filter(appointment => {
            const patient = patientService.getPatientById(appointment.patientId);
            return patient && `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm) && appointment.doctorId === loggedInDoctorId;
        });
        displayAppointments(filteredAppointments);
    });

    // Date Filter Functionality
    dateFilter.addEventListener('change', () => {
        const filterDate = dateFilter.value;
        const filteredAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.appointmentTime).toISOString().split('T')[0];
            return (!filterDate || appointmentDate === filterDate) && appointment.doctorId === loggedInDoctorId;
        });
        displayAppointments(filteredAppointments);
    });
});