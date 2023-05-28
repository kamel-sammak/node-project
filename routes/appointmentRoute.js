const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentModel");

router.get("/", (req, res) => {
  Appointment.find()
    .then((appointments) => res.json(appointments))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve appointments" });
    });
});

router.post("/", (req, res) => {
  const { patient, doctor, date } = req.body;
  if (!mongoose.Types.ObjectId.isValid(patient)) {
    return res.status(400).json({ error: "Invalid patient ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(doctor)) {
    return res.status(400).json({ error: "Invalid doctor ID" });
  }
  const newAppointment = new Appointment({
    patient: new mongoose.Types.ObjectId(patient),
    doctor: new mongoose.Types.ObjectId(doctor),
    date,
  });
  newAppointment
    .save()
    .then((appointment) => res.json(appointment))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not create appointment" });
    });
});

module.exports = router;
