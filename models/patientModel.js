const mongoose = require('mongoose');
const patientSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "please enter user firstName !"]
        },
        lastName: {
            type: String,
            required: [true, "please enter user lastName !"]
        },
        patientName: {
            type: String,
            required: [true , "please enter patientName !"]
        },
        age: {
            type: Number,
            required: [true , "please enter age !"]
        },
        gender: {
            type: String,
            required: [true , "please enter gender !"]
        },
        email: {
            type: String,
            required: [true , "please enter email !"]
        },
        phones: [{
            type: String,
            required: [true , "please enter phone !"]
        }],
        location: {
            type: String,
            required: [true , "please enter location !"]
        },
        diagnosis: {
            type: String,
            required: [false , "please enter diagnosis !"]
        }, 
        required_medications: {
            type: String,
            required: [false , "please enter required medications !"]
        },
        

    },
    
    // {
    //     timestamps: false
    // }
)

const Patient = mongoose.model('Patient' , patientSchema);
module.exports = Patient; 