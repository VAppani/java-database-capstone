// doctorCard.js
function createDoctorCard(doctor) {
    const doctorCard = document.createElement('div');
    doctorCard.className = 'doctor-card';
    doctorCard.innerHTML = `
        <h3>${doctor.firstName} ${doctor.lastName}</h3>
        <p>Specialization: ${doctor.specialization}</p>
        <p>Email: ${doctor.email}</p>
    `;
    return doctorCard;
}

// Export function for use in other files (optional, for modularity)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createDoctorCard };
}

// Make available globally for Thymeleaf inline scripts
window.createDoctorCard = createDoctorCard;