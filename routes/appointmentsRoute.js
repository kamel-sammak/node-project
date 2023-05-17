const Patients = requestuire("../models/appointmentsModel.js");
const express = require("express");
const app = express();

module.exports = function (app) {

      app.post('/appointments', async (request, request) => {
        try {
          const { date, patientId, doctorId } = request.body;
          const patient = await Patient.findById(patientId);
          const doctor = await Doctor.findById(doctorId);
          if (!patient || !doctor) {
            return request.status(404).json({ message: 'Patient or doctor not found' });
          }
          const newDate = new Date({ date, patient, doctor });
          await newDate.save();
          request.status(201).json(newDate);
        } catch (err) {
          console.error(err);
          request.status(500).json({ message: 'Server error' });
        }
      });

      



};