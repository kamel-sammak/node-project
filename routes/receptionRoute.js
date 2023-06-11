const express = require("express");
const Reception=require("../models/receptionModel.js")
const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel.js");

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



router.post("/addappointment", async (req, res) => {
  const { date, doctorName, patientName } = req.body;

  const foundDoctor = await Doctor.findOne({ doctorName });

  if (!foundDoctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  const foundPatient = await Patient.findOne({ patientName });

  if (!foundPatient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const newAppointment = new Appointment({
    date,
    doctor: foundDoctor.doctorName,
    patient: foundPatient.patientName,
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
    const { patientName, doctorName } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { patient: patientName, doctor: doctorName },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: `Cannot find appointment with id ${id}` });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update appointment" });
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

