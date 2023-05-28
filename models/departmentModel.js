const mongoose = require('mongoose');
const departmentsSchema = mongoose.Schema(
    {
       
    },

    {
        timestamps: true
    }
)

const Departments = mongoose.model('Departments', departmentsSchema);
module.exports = Departments;