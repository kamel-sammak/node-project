const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: [true , "please enter user name !"]
        },
        password: {
            type: String,
            required: [true , "please enter password !"]
        },
        role: {
            type: String,
            required: [true , "please enter role !"]
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User' , userSchema);
module.exports = User; 