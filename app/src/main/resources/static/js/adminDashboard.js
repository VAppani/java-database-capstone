// adminDashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const doctorList = document.getElementById('doctorList');
    const doctorSearch = document.getElementById('doctorSearch');
    const timeFilter = document.getElementById('timeFilter');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const addDoctorBtn = document.getElementById('addDoctorBtn');
    const addDoctorModal = document.getElementById('addDoctorModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const addDoctorForm = document.getElementById('addDoctorForm');

    // Use doctorService
    let doctors = doctorService.getAllDoctors();

    // Display Doctors
    function displayDoctors(doctorsToShow) {
        doctorList.innerHTML = '';
        doctorsToShow.forEach(doctor => {
            const doctorCard = createDoctorCard(doctor);
            doctorList.appendChild(doctorCard);
        });
    }

    // Initial Display
    displayDoctors(doctors);

    // Search Functionality
    doctorSearch.addEventListener('input', () => {
        const searchTerm = doctorSearch.value.toLowerCase();
        const filteredDoctors = doctorService.searchDoctors(searchTerm);
        displayDoctors(filteredDoctors);
    });

    // Filter Functionality
    function applyFilters() {
        let filteredDoctors = [...doctorService.getAllDoctors()];
        const timeValue = timeFilter.value;
        const specialtyValue = specialtyFilter.value;

        if (timeValue !== 'all') {
            filteredDoctors = filteredDoctors.filter(doctor => {
                // Dummy time filter (replace with actual appointment data later)
                return timeValue === 'morning' || timeValue === 'afternoon';
            });
        }
        if (specialtyValue !== 'all') {
            filteredDoctors = filteredDoctors.filter(doctor =>
                doctor.specialization === specialtyValue
            );
        }
        displayDoctors(filteredDoctors);
    }

    timeFilter.addEventListener('change', applyFilters);
    specialtyFilter.addEventListener('change', applyFilters);

    // Modal Functionality
    addDoctorBtn.onclick = () => {
        addDoctorModal.style.display = 'block';
    }

    closeModal.onclick = () => {
        addDoctorModal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == addDoctorModal) {
            addDoctorModal.style.display = 'none';
        }
    }

    // Add Doctor Form Submission
    addDoctorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newDoctor = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            specialization: document.getElementById('specialization').value,
            email: document.getElementById('email').value
        };
        doctorService.addDoctor(newDoctor);
        displayDoctors(doctorService.getAllDoctors());
        addDoctorModal.style.display = 'none';
        addDoctorForm.reset();
        // TODO: Add API call to save to backend
        console.log('New doctor added:', newDoctor);
    });
});