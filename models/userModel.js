const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
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