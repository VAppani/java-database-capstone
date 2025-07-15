// index.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.createElement('form');
    loginForm.innerHTML = `
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <select id="roleSelector">
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
        </select>
        <button type="submit">Login</button>
    `;
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('roleSelector').value;

        // Simulate login (replace with API call later)
        const token = btoa(`${username}:${password}:${role}`); // Base64 encode for demo
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userRole', role);

        // Redirect based on role (simulated)
        if (role === 'admin') {
            window.location.href = '/admin/dashboard';
        } else if (role === 'doctor') {
            window.location.href = '/doctor/dashboard';
        }
    });

    // Check if already logged in
    const token = localStorage.getItem('jwtToken');
    if (token) {
        const [username, password, role] = atob(token).split(':');
        if (role === 'admin') {
            window.location.href = '/admin/dashboard';
        } else if (role === 'doctor') {
            window.location.href = '/doctor/dashboard';
        }
    } else {
        document.body.appendChild(loginForm);
    }

    // Logout function
    window.logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        window.location.href = '/';
    };

    // Export for reuse
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { logout };
    }
    window.logout = logout;
});