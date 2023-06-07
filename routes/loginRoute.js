
const express = require('express');
const router = express.Router();
const Reception=require("../models/receptionModel.js")
const Doctor = require("../models/doctorModel.js");



    router.post("/login", async (request, response) => {
        try {
          const { receptionEmail, email, password } = request.body;
      
          if (receptionEmail) {
            const reception = await Reception.findOne({ receptionEmail });
            var isMatch = false;
            if (reception) isMatch = await (password === reception.password);
            if (!reception || !isMatch)
              return response
                .status(400)
                .json({ error: "Invalid USERNAME or PASSWORD" });
            if (reception && isMatch) return response.status(200).json({ message: "success" });
          }
      
          if (email) {
            const doctor = await Doctor.findOne({ email });
            var isMatch = false;
            if (doctor) isMatch = await (password === doctor.password);
            if (!doctor || !isMatch)
              return response
                .status(400)
                .json({ error: "Invalid USERNAME or PASSWORD" });
            if (doctor && isMatch) return response.status(200).json({ message: "success" });
          }
      
          // If neither receptionEmail nor email is present in the request body
          return response.status(400).json({ error: "Invalid request" });
        } catch (error) {
          console.log(error.message);
          response.status(500).json({ message: error.message });
        }
      });

module.exports = router;
