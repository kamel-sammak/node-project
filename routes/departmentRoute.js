const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Department = require("../models/departmentModel");


router.get("/", (req, res) => {
  Department.find()
    .then((department) => res.json(department))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve department" });
    });
});

router.post("/", (req, res) => {
  const { section, doctor, description } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(doctor)) {
    return res.status(400).json({ error: "Invalid doctor ID" });
  }
  const newDepartment = new Department({
    doctor: new mongoose.Types.ObjectId(doctor),
    description,
    section,
  });
  newDepartment
    .save()
    .then((department) => res.json(department))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not create department" });
    });
});


module.exports = router;
