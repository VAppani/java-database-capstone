// patientService.js
import { API_BASE_URL } from "../config/config.js";
const PATIENT_API = API_BASE_URL + '/patient';

// Dummy data as fallback (replace with API when available)
let patients = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@smartclinic.com', phone: '1234567890', dateOfBirth: '1990-05-15' },
    { id: 2, firstName: 'Bob', lastName: 'Brown', email: 'bob.b@smartclinic.com', phone: '0987654321', dateOfBirth: '1985-09-22' },
    { id: 3, firstName: 'Charlie', lastName: 'Wilson', email: 'charlie.w@smartclinic.com', phone: '5556677889', dateOfBirth: '1988-03-10' },
    { id: 4, firstName: 'Emma', lastName: 'Taylor', email: 'emma.t@smartclinic.com', phone: '4445566778', dateOfBirth: '1992-11-25' }
];

// For creating a patient in db
export async function patientSignup(data) {
    try {
        const response = await fetch(`${PATIENT_API}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return { success: response.ok, message: result.message };
    } catch (error) {
        console.error("Error :: patientSignup :: ", error);
        return { success: false, message: error.message };
    }
}

// For logging in patient (aligned with index.js)
export async function patientLogin(data) {
    try {
        const response = await fetch(`${PATIENT_API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            const token = result.token; // Assume API returns a token
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userRole', 'patient'); // Set role as patient
            return { success: true, token };
        }
        throw new Error(result.message || 'Login failed');
    } catch (error) {
        console.error("Error :: patientLogin :: ", error);
        return { success: false, message: error.message };
    }
}

// For getting patient data (name, id, etc)
export async function getPatientData(token) {
    try {
        const response = await fetch(`${PATIENT_API}/${token}`);
        const data = await response.json();
        if (response.ok) return data.patient || patients.find(p => p.id === parseInt(token)); // Fallback to dummy data
        return null;
    } catch (error) {
        console.error("Error fetching patient details:", error);
        return patients.find(p => p.id === parseInt(token)) || null; // Fallback
    }
}

// Fetch patient appointments (for doctor or patient view)
export async function getPatientAppointments(id, token, user) {
    try {
        const response = await fetch(`${PATIENT_API}/${id}/${user}/${token}`);
        const data = await response.json();
        console.log(data.appointments);
        if (response.ok) return data.appointments || []; // Fallback to empty array
        return [];
    } catch (error) {
        console.error("Error fetching patient appointments:", error);
        return [];
    }
}

// Filter patients or appointments
export async function filterAppointments(condition, name, token) {
    try {
        const response = await fetch(`${PATIENT_API}/filter/${condition}/${name}/${token}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            const data = await response.json();
            return data.appointments || [];
        } else {
            console.error("Failed to fetch appointments:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
        return [];
    }
}

// Additional filter by date of birth (for admin/doctor use)
export function filterPatientsByDate(date) {
    return patients.filter(patient => {
        const dob = new Date(patient.dateOfBirth);
        const filterDate = new Date(date);
        return dob.toDateString() === filterDate.toDateString(); // Exact match for now
    });
}

// Export all patients for admin use
export function getAllPatients() {
    return [...patients];
}