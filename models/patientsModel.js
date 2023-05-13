const mongoose = require('mongoose');
const patientsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter name !"]
        },
       
        gender: {
            type: String,
            required: [true, "please enter gender !"]
        },
        age: {
            type: Number,
            required: [true, "please enter age !"]
        },

        contact:{
            email:{
                type: String,
                required: [true , "please enter email !"]
            },
            phone:{
                type: Number,
                required: [true , "please enter phone !"]
            }
        }
    },

    {
        timestamps: true
    }
)

const Patients = mongoose.model('Patients', patientsSchema);
module.exports = Patients;