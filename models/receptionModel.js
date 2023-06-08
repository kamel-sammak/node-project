const mongoose = require('mongoose');
const receptionSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true , "please enter user firstName !"]
        },
        lastName: {
            type: String,
            required: [true , "please enter lastName !"]
        },
        receptionName: {
            type: String,
            required: [true , "please enter receptionName !"]
        },
        email: {
            type: String,
            required: [true , "please enter receptionEmail !"]
        },
        password: {
            type: String,
            required: [true , "please enter password !"]
        },
        phones:[ {
            type: Number,
            required: [true , "please enter phones !"]
        }],
        location: {
            type: String,
            required: [true , "please enter location !"]
        },
        age: {
            type: String,
            required: [true , "please enter birthDate !"]
        },
        gender: {
            type: String,
            required: [true, "please enter gender !"]
        }
        
    },
    //{
    //    timestamps: true
    //}
)

const Reception = mongoose.model('Reception' , receptionSchema);
module.exports = Reception; 