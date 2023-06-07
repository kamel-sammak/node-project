const express = require("express");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");
const router = express.Router();


router.get("/getMyInfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (doctor) res.status(200).json(doctor);
    else res.status(404).json({ message: "can't find doctor" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/editDoctorInfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body);
    if (!doctor)
      res.status(404).json({ message: `cannot find doctor with id ${id} !` });
    else {
      const newDoctor = await Doctor.findById(id);
      res.status(200).json(newDoctor);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/doctor_appoitment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await Appointment.find({ doctor: id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/view_patient_details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    const patient = await Patient.findById(appointment.patient);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/editPatientDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, req.body);
    if (!patient)
      res.status(404).json({ message: `cannot find doctor with id ${id} !` });
    else {
      const newPatient = await Patient.findById(id);
      res.status(200).json(newPatient);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
