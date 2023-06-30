const express = require('express');
const router = express.Router();
const Reception = require("../models/receptionModel.js");
const Doctor = require("../models/doctorModel.js");
const Admin = require("../models/adminModel.js");

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    // Check if the user is an admin
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      return response.status(200).json({ role: "admin", message: "Admin login successful", id: admin._id, name: admin.firstName });
    }

    // Check if the user is a receptionist
    const reception = await Reception.findOne({ email, password });
    if (reception) {
      return response.status(200).json({ role: "reception", message: "Reception login successful", id: reception._id, name: reception.receptionName });
    }

    // Check if the user is a doctor
    const doctor = await Doctor.findOne({ email, password });
    if (doctor) {
      return response.status(200).json({ role: "doctor", message: "Doctor login successful", id: doctor._id, name: doctor.doctorName });
    }

    // If no matching user is found
    return response.status(400).json({ error: "Invalid email or password" });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});



module.exports = router;