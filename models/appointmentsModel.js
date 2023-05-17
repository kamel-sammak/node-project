const mongoose = require('mongoose');
const appointmentsSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: [true, "please enter date !"]
        },
       
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            Reference:'patient',
            required: [true, "please enter patient !"]
        },

        doctor:{
            type: mongoose.Schema.Types.ObjectId,
            Reference:'doctor',
            required: [true, "please enter doctor !"]

        }
        
    },

    {
        timestamps: true
    }
)

const Appointments = mongoose.model('Appointments', appointmentsSchema);
module.exports = Appointments;