const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true , "please enter user firstName !"]
        },
        lastName: {
            type: String,
            required: [true , "please enter user lastName !"]
        },
        doctorName: {
            type: String,
            required: [true , "please enter user doctorName !"]
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
        email:{
                type: String,
                required: [true , "please enter email !"]
            },
        password:{
                type: String,
                required: [true , "please enter password !"]
            },
        phones:[{
                type: String,
                required: [true , "please enter phone !"]
            }],
        location:{
                type: String,
                required: [true , "please enter location !"]
            }    
        
    },
    
    //{
    //    timestamps: true
    //}
)

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;