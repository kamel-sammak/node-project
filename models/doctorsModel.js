const mongoose = require('mongoose');
const doctorsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter name !"]
        },
        specialty: {
            type: String,
            required: [true, "please enter specialty !"]
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

const Doctors = mongoose.model('Doctors', doctorsSchema);
module.exports = Doctors;