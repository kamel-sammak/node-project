const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter user name !"]
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
    },
    {
        timestamps: true
    }
)

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;