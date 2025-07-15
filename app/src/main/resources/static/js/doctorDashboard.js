// doctorDashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const appointmentList = document.getElementById('appointmentList');
    const prescriptionDetails = document.getElementById('prescriptionContent');
    const appointmentSearch = document.getElementById('appointmentSearch');
    const dateFilter = document.getElementById('dateFilter');

    // Simulate logged-in doctor (replace with actual role from index.js later)
    const loggedInDoctorId = 1; // Assume Doctor John Doe (ID 1)

    // Load appointments
    async function loadAppointments() {
        const appointments = await patientService.getPatientAppointments(loggedInDoctorId, localStorage.getItem('jwtToken'), 'doctor') || [];
        return appointments.filter(a => a.doctorId === loggedInDoctorId);
    }

    // Display Appointments
    async function displayAppointments(appointmentsToShow) {
        appointmentList.innerHTML = '';
        appointmentsToShow.forEach(appointment => {
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
        });
    }

    // Display Prescriptions
    window.viewPrescription = async function (patientId) {
        const appointments = await loadAppointments();
        const patientAppointment = appointments.find(a => a.patientId === patientId);
        if (patientAppointment) {
            const prescriptions = await patientService.getPatientAppointments(patientId, localStorage.getItem('jwtToken'), 'doctor') || [];
            prescriptionDetails.innerHTML = '';
            if (prescriptions.length > 0) {
                prescriptions.forEach(prescription => {
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
        }
    };

    // Initial Display
    loadAppointments().then(appointments => displayAppointments(appointments));

    // Search Functionality
    appointmentSearch.addEventListener('input', async () => {
        const searchTerm = appointmentSearch.value.toLowerCase();
        const appointments = await loadAppointments();
        const filteredAppointments = appointments.filter(appointment => {
            const patient = patientService.getPatientById(appointment.patientId);
            return patient && `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm);
        });
        displayAppointments(filteredAppointments);
    });

    // Date Filter Functionality
    dateFilter.addEventListener('change', async () => {
        const filterDate = dateFilter.value;
        const appointments = await loadAppointments();
        const filteredAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.appointmentTime).toISOString().split('T')[0];
            return (!filterDate || appointmentDate === filterDate);
        });
        displayAppointments(filteredAppointments);
    });
});