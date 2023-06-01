const express = require("express");
const Doctor = require("../models/doctorModel");

const router = express.Router();

router.post("/loginasDoctor", async (request, response) => {
  try {
    const { email, password } = request.body;
    const doctor = await Doctor.findOne({ email });
    var isMatch = false;
    if (doctor) isMatch = await (password === doctor.password);
    if (!doctor || !isMatch)
      return response
        .status(400)
        .json({ error: "Invalid USERNAME or PASSWORD" });
    if (doctor && isMatch) return response.status(200).json({message:"success"});
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});
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

module.exports = router;
