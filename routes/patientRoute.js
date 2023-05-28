const express = require("express");
const Patient = require("../models/patientModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const Patients = await Patient.find({});
    res.status(200).json(Patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(200).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
