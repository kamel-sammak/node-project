const mongoose = require('mongoose');
const patientSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "please enter user name !"]
        },
        lastName: {
            type: String,
            required: [true, "please enter user name !"]
        },
        age: {
            type: Number,
            required: [true , "please enter age !"]
        },
        phone: {
            type: String,
            required: [true , "please enter phone !"]
        }
    },
    {
        timestamps: true
    }
)

const Patient = mongoose.model('Patient' , patientSchema);
module.exports = Patient; 