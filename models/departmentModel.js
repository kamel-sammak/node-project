const mongoose = require('mongoose');
const departmentsSchema = mongoose.Schema(
  {
    section: {
      type: String,
      required: [true, "please enter section!"],
    },
    description: {
      type: String,
      required: [true, "please enter description!"],
    },
    doctor: {
      type: String,
      required: [true, "please enter doctor!"],
    },
  }
);

const Department = mongoose.model('Department', departmentsSchema);

module.exports = Department;
