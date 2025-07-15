// doctorService.js
const doctorService = (function () {
    // Dummy data (replace with API calls later)
    let doctors = [
        { id: 1, firstName: 'John', lastName: 'Doe', specialization: 'Cardiology', email: 'john.doe@smartclinic.com' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', specialization: 'Pediatrics', email: 'jane.smith@smartclinic.com' },
        { id: 3, firstName: 'Michael', lastName: 'Lee', specialization: 'Orthopedics', email: 'michael.lee@smartclinic.com' },
        { id: 4, firstName: 'Sarah', lastName: 'Davis', specialization: 'Dermatology', email: 'sarah.davis@smartclinic.com' }
    ];

    return {
        // Get all doctors
        getAllDoctors: function () {
            return [...doctors]; // Return a copy to prevent direct manipulation
        },

        // Add a new doctor
        addDoctor: function (doctor) {
            doctor.id = doctors.length + 1;
            doctors.push(doctor);
            return doctor;
        },

        // Delete a doctor by ID
        deleteDoctor: function (id) {
            const index = doctors.findIndex(d => d.id === id);
            if (index !== -1) {
                doctors.splice(index, 1);
                return true;
            }
            return false;
        },

        // Search doctors by name
        searchDoctors: function (searchTerm) {
            return doctors.filter(doctor =>
                `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    };
})();

// Export for reuse
if (typeof module !== 'undefined' && module.exports) {
    module.exports = doctorService;
}
window.doctorService = doctorService;