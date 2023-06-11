const mongoose = require('mongoose');
const AppointmentSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: [true, "Please enter the appointment date"],
          },
          doctor: {
            type: String,
            required: [true, "Please enter the doctor's name"],
          },
          patient: {
            type: String,
            required: [true, "Please enter the patient ID"],
          },
        });
    
    //{
    //    timestamps: true
    //}

////
const Appointment = mongoose.model('Appointment' , AppointmentSchema);
module.exports = Appointment; 