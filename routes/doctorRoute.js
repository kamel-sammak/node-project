const express = require("express");
const Doctor = require("../models/doctorModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (doctor) res.status(200).json(doctor);
    else res.status(404).json({ message: "can't find doctor" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor)
      res.status(404).json({ message: `cannot find doctor with id ${id} !` });
    else res.status(200).json({ message: "doctor delete from doctors" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
