const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employeeID: { type: String, unique: true, required: true },
  salary: { type: Number, required: true },
  workingDepartment: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);