const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({

    doctorName:{
        type: String,
        required: [true , "please enter user doctorName !"]
    },

    email:{
        type: String,
        required: [true , "please enter email !"]
    },
    
    password:{
        type: String,
        required: [true , "please enter password !"]
    
    }

});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
