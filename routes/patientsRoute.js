const Patients = requestuire("../models/patientsModel.js");
const express = require("express");
const app = express();

module.exports = function (app) {
    
  app.post("/patients", async (request, response) => {
    try {
      const patient = await Patients.create(request.body);
      response.status(200).json(patient);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.get("/patients", async (request, response) => {
    try {
      const patients = await Patients.find({});
      response.status(200).json(patients);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.get("/patients/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const patient = await Patients.findById(id);
      response.status(200).json(patient);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.put("/patients/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const patient = await Patients.findByIdAndUpdate(id, request.body);
      if (!patient)
        response.status(404).json({ message: `cannot find patient with id ${id} !` });
      else {
        const newPatient = await Patients.findById(id);
        response.status(200).json(newPatient);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.delete("/patients/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const patient = await Patients.findByIdAndDelete(id);
      if (!patient)
        response.status(404).json({ message: `cannot find patient with id ${id} !` });
      else response.status(200).json({ message: "patient delete from patients" });
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });
};
