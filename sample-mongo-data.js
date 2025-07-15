use prescriptions;

db.prescriptions.insertMany([
  {
    prescription_id: "RX001",
    patient_id: 1,
    doctor_id: 1,
    date_issued: ISODate("2025-07-15"),
    medications: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "Twice daily", duration: "7 days" }
    ],
    notes: "Take with food."
  },
  {
    prescription_id: "RX002",
    patient_id: 2,
    doctor_id: 2,
    date_issued: ISODate("2025-07-15"),
    medications: [
      { name: "Ibuprofen", dosage: "200mg", frequency: "As needed", duration: "5 days" }
    ],
    notes: "Avoid alcohol."
  }
]);

