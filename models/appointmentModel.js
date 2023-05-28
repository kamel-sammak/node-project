const mongoose = require('mongoose');
const AppointmentSchema = mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patient',
            required: [true , "please enter user patient !"]
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctor',
            required: [true , "please enter doctor !"]
        },
        date: {
            type: String,
            required: [true , "please enter date !"]
        }
    },
    {
        timestamps: true
    }
)

const Appointment = mongoose.model('Appointment' , AppointmentSchema);
module.exports = Appointment; 