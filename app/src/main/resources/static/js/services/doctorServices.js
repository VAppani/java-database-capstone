// doctorService.js
const doctorService = (function () {
    const API_BASE_URL = 'http://localhost:8080/api'; // Adjust based on your Spring Boot port

    // Fallback dummy data
    let doctors = [
        { id: 1, firstName: 'John', lastName: 'Doe', specialization: 'Cardiology', email: 'john.doe@smartclinic.com' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', specialization: 'Pediatrics', email: 'jane.smith@smartclinic.com' },
        { id: 3, firstName: 'Michael', lastName: 'Lee', specialization: 'Orthopedics', email: 'michael.lee@smartclinic.com' },
        { id: 4, firstName: 'Sarah', lastName: 'Davis', specialization: 'Dermatology', email: 'sarah.davis@smartclinic.com' }
    ];

    async function fetchDoctors() {
        try {
            const response = await fetch(`${API_BASE_URL}/doctors`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
            });
            if (response.ok) {
                doctors = await response.json();
            } else {
                console.warn('API failed, using dummy data');
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
        return [...doctors];
    }

    return {
        // Get all doctors
        getAllDoctors: async function () {
            return await fetchDoctors();
        },

        // Add a new doctor
        addDoctor: async function (doctor) {
            try {
                const response = await fetch(`${API_BASE_URL}/doctors`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    },
                    body: JSON.stringify(doctor)
                });
                if (response.ok) {
                    const newDoctor = await response.json();
                    doctors.push(newDoctor);
                    return newDoctor;
                }
                throw new Error('Failed to add doctor');
            } catch (error) {
                console.error('Error adding doctor:', error);
                return null;
            }
        },

        // Delete a doctor by ID
        deleteDoctor: async function (id) {
            try {
                const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
                });
                if (response.ok) {
                    doctors = doctors.filter(d => d.id !== id);
                    return true;
                }
                throw new Error('Failed to delete doctor');
            } catch (error) {
                console.error('Error deleting doctor:', error);
                return false;
            }
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