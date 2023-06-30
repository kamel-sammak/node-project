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
    const { email, password, doctorName } = request.body;

    const admin = await Admin.create({
      email,
      password,
      doctorName,
    });

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
  
  
  router.get("/getReception_info/:receptionName", async (request, response) => {
    try {
      const { receptionName } = request.params;
      const reception = await Reception.findOne({ receptionName }).select('firstName lastName receptionName email phones location age gender');
      if (!reception) {
        return response.status(404).json({ message: "Reception not found" });
      }
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

  
  router.get('/doctor_appointment/:doctorId', async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      // Find the doctor by ID
      const doctor = await Doctor.findById(doctorId);
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Find the appointments for the given doctor ID and populate doctor and patient fields with patientName
      const appointments = await Appointment.find({ doctor: doctorId })
        .populate({ path: 'patient', select: 'patientName' });
  
      const formattedAppointments = appointments.map(appointment => {
        return {
          id: appointment._id,
          date: appointment.date,
          doctorName: appointment.doctor,
          patientName: appointment.patient.patientName
        };
      });
  
      const doctorWithAppointments = {
        id: doctor._id,
        doctorName: doctor.doctorName,
        appointments: formattedAppointments
      };
  
      res.status(200).json(doctorWithAppointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  


router.get("/getallDepartments", async (req, res) => {
  try {
    const departments = await Department.find();
    const departmentsWithDoctorName = await Promise.all(
      departments.map(async (department) => {
        const doctor = await Doctor.findOne({ doctorName: department.doctor });
        return {
          _id: department._id,
          section: department.section,
          description: department.description,
          doctorName: doctor ? doctor.doctorName : 'Unknown',
        };
      })
    );
    res.json(departmentsWithDoctorName);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve departments" });
  }
});




  
router.post("/addDepartments", async (req, res) => {
  const { section, description, doctorName } = req.body;

  const foundDoctor = await Doctor.findOne({ doctorName });

  if (!foundDoctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  const newDepartment = new Department({
    section,
    description,
    doctor: foundDoctor.doctorName, // Use the doctorName field
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
      const { section, description, doctorName } = req.body;
  
      // Find the department by ID
      const updatedDepartment = await Department.findById(id);
  
      if (!updatedDepartment) {
        return res.status(404).json({ message: `Department with ID ${id} not found` });
      }
  
      // Update the department's section, description, and doctor name
      updatedDepartment.section = section;
      updatedDepartment.description = description;
      updatedDepartment.doctorName = doctorName;
  
      // Save the updated department
      const savedDepartment = await updatedDepartment.save();
  
      res.status(200).json(savedDepartment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  
  
  module.exports = router;
