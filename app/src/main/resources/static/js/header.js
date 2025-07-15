// header.js
document.addEventListener('DOMContentLoaded', () => {
    const header = document.createElement('header');
    header.className = 'main-header';

    // Check role from localStorage (simulated for now)
    const role = localStorage.getItem('userRole') || 'guest'; // Default to 'guest' if not set

    let navLinks = '';
    if (role === 'admin') {
        navLinks = `
            <nav>
                <ul>
                    <li><a href="/admin/dashboard">Dashboard</a></li>
                    <li><a href="/admin/doctors">Manage Doctors</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
        `;
    } else if (role === 'doctor') {
        navLinks = `
            <nav>
                <ul>
                    <li><a href="/doctor/dashboard">Dashboard</a></li>
                    <li><a href="/doctor/appointments">Appointments</a></li>
                    <li><a href="/doctor/prescriptions">Prescriptions</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
        `;
    } else {
        navLinks = `
            <nav>
                <ul>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        `;
    }

    header.innerHTML = `
        <h1>Smart Clinic</h1>
        ${navLinks}
    `;

    // Replace the header in the DOM (Thymeleaf will handle this via fragment)
    document.body.insertAdjacentElement('afterbegin', header);

    // Export for Thymeleaf or other modules (optional)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { initializeHeader: () => header };
    }
    window.initializeHeader = () => header;
});