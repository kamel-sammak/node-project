const express = require("express");
const Reception=require("../models/receptionModel.js")
const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");
const mongoose = require('mongoose');


const router = express.Router();



 
router.get("/getReception_info/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const reception = await Reception.findById(id);
    response.status(200).json(reception);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

router.put("/editReception_info/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const reception = await Reception.findByIdAndUpdate(id, request.body);
    if (!reception)
      response
        .status(404)
        .json({ message: `cannot find user with id ${id} !` });
    else {
      const newreception = await Reception.findById(id);
      response.status(200).json(newreception);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});
router.post("/addPatient", async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(200).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put("/editpatient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newPatient = await Patient.findByIdAndUpdate(id, req.body);
    if (!newPatient)
      res.status(404).json({ message: `cannot find Patient with id ${id} !` });
    else {
      const newPatient = await Patient.findById(id);
      res.status(200).json(newPatient);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/getallPatients", async (req, res) => {
  try {
    const Patients = await Patient.find({});
    res.status(200).json(Patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getPatient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deletePatient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient)
      res.status(404).json({ message: `cannot find patient with id ${id} !` });
    else res.status(200).json({ message: "patient delete from patients" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.post("/addappointment/:id", async(req, res) => {
  const { date,doctor } = req.body;
 
  if (!mongoose.Types.ObjectId.isValid(doctor)) {
    return res.status(400).json({ error: "Invalid doctor ID" });
  }
  const { id } = req.params;
    const patient = await Patient.findById(id);
  const newAppointment = new Appointment({
    date,
    doctor: new mongoose.Types.ObjectId(doctor),
    patient: patient
  });
  newAppointment
    .save()
    .then((appointment) => res.json(appointment))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not create appointment" });
    });
});
router.delete("/deleteAppointment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment)
      res.status(404).json({ message: `cannot find patient with id ${id} !` });
    else res.status(200).json({ message: "patient delete from patients" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/editappointment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newAppointment = await Appointment.findByIdAndUpdate(id, req.body);
    if (!newAppointment)
      res.status(404).json({ message: `cannot find Patient with id ${id} !` });
    else {
      const newAppointment = await Appointment.findById(id);
      res.status(200).json(newAppointment);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/getAllAppointment", (req, res) => {
  Appointment.find()
    .then((appointments) => res.json(appointments))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve appointments" });
    });
});

module.exports = router;

