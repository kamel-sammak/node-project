const mongoose = require('mongoose');
const AppointmentSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: [true , "please enter date !"]
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctor',
            required: [true , "please enter doctor !"]
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patient',
            required: [true , "please enter user patient !"]
        },    
    },
    
    {
        timestamps: true
    }
)

const Appointment = mongoose.model('Appointment' , AppointmentSchema);
module.exports = Appointment; 