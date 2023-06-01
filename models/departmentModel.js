const mongoose = require('mongoose');
const departmentsSchema = mongoose.Schema(
    {
        section:{
            type: String,
            required: [true , "please enter section !"]
        },
        description:{
            type: String,
            required: [true , "please enter description !"]
        },
        doctor: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctor',
            required: [true , "please enter doctor !"]
        }],
    },

    //{
    //    timestamps: true
    //}
)

const Departments = mongoose.model('Departments', departmentsSchema);
module.exports = Departments;