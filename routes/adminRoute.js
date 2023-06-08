const express = require("express");
const Reception=require("../models/receptionModel.js")
const router = express.Router();
const Doctor = require("../models/doctorModel");
const Department = require("../models/departmentModel");
const Appointment = require("../models/appointmentModel");
const Admin = require("../models/adminModel.js");
const mongoose = require('mongoose');


router.post("/addAdmin", async (request, response) => {
  try {
    const admin = await Admin.create(request.body);
    response.status(200).json(admin);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});


router.post("/addReception", async (request, response) => {
    try {
      const reception = await Reception.create(request.body);
      response.status(200).json(reception);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });
    
  router.get("/get_allReception", async (request, response) => {
    try {
      const reception = await Reception.find({}).select('firstName lastName receptionName email phones location age gender');
      response.status(200).json(reception);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });
  
  
router.get("/getReception_info/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const reception = await Reception.findById(id).select('firstName lastName receptionName email phones location age gender');
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
  
  router.delete("/deleteReception_info/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const reception = await Reception.findByIdAndDelete(id);
      if (!reception)
        response
          .status(404)
          .json({ message: `cannot find user with id ${id} !` });
      else response.status(200).json({ message: "user delete from users" });
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  

  router.get("/getAlldoctors", async (req, res) => {
    try {
      const doctors = await Doctor.find({}).select('firstName lastName doctorName specialty gender age email phones location');
      res.status(200).json(doctors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.get("/getDoctor_info/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findById(id).select('firstName lastName doctorName specialty gender age email phones location');
      if (doctor) res.status(200).json(doctor);
      else res.status(404).json({ message: "can't find doctor" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post("/addDoctor", async (req, res) => {
    try {
      const doctor = await Doctor.create(req.body);
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.put("/editDoctor_info/:id", async (req, res) => {
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
  
  router.delete("/deleteDoctor/:id", async (req, res) => {
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

  
router.get("/doctor_appoitment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await Appointment.find({ doctor: id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  router.get("/getallDeapartments", (req, res) => {
    Department.find()
      .then((department) => res.json(department))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Could not retrieve department" });
      });
  });
  
  router.post("/addDepartments", (req, res) => {
    const { section,description, doctor } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(doctor)) {
      return res.status(400).json({ error: "Invalid doctor ID" });
    }
    const newDepartment = new Department({
      section,      
      description,
      doctor: new mongoose.Types.ObjectId(doctor)

    });
    newDepartment
      .save()
      .then((department) => res.json(department))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Could not create department" });
      });
  });
  router.delete("/deletedepartment/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const department = await Department.findByIdAndDelete(id);
      if (!department)
        res.status(404).json({ message: `cannot find doctor with id ${id} !` });
      else res.status(200).json({ message: "doctor delete from doctors" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

   router.put("/editdepartment/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const department = await Department.findByIdAndUpdate(id, req.body);
      if (!department)
        res.status(404).json({ message: `cannot find doctor with id ${id} !` });
      else {
        const newDepartment = await Department.findById(id);
        res.status(200).json(newDepartment);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  module.exports = router;
