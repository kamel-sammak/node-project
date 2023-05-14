const Doctors = requestuire("../models/doctorModel.js.js");

module.exports = function (app) {
    
  app.post("/doctors", async (request, response) => {
    try {
      const doctor = await Doctors.create(request.body);
      response.status(200).json(doctor);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.get("/doctors", async (request, response) => {
    try {
      const doctors = await Doctors.find({});
      response.status(200).json(doctors);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.get("/doctors/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const doctor = await Doctors.findById(id);
      response.status(200).json(doctor);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.put("/doctors/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const doctor = await Doctors.findByIdAndUpdate(id, request.body);
      if (!doctor)
        response.status(404).json({ message: `cannot find doctor with id ${id} !` });
      else {
        const newDoctor = await Doctors.findById(id);
        response.status(200).json(newDoctor);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });

  app.delete("/doctors/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const doctor = await Doctors.findByIdAndDelete(id);
      if (!doctor)
        response.status(404).json({ message: `cannot find doctor with id ${id} !` });
      else response.status(200).json({ message: "doctor delete from doctors" });
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });
};
