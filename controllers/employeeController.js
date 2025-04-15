const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Render form
router.get('/', (req, res) => {
  res.render('templates/index');
});

// Add Employee
router.post('/add', async (req, res) => {
  const { firstName, lastName, employeeID, salary, workingDepartment, email } = req.body;

  // Server-Side Validation
  if (!firstName.match(/^[A-Za-z]+$/)) {
    return res.status(400).render('error', { message: 'Invalid first name. Only letters are allowed.' });
  }

  if (!lastName.match(/^[A-Za-z]+$/)) {
    return res.status(400).render('error', { message: 'Invalid last name. Only letters are allowed.' });
  }

  if (!employeeID.match(/^[0-9]+$/)) {
    return res.status(400).render('error', { message: 'Invalid employee ID. Only numbers are allowed.' });
  }

  if (isNaN(salary) || salary < 0) {
    return res.status(400).render('error', { message: 'Invalid salary. Enter a positive number.' });
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).render('error', { message: 'Invalid email format.' });
  }

  try {
    const newEmployee = new Employee({ firstName, lastName, employeeID, salary, workingDepartment, email });
    await newEmployee.save();
    res.redirect('/employee');
  } catch (error) {
    res.status(400).render('templates/error', { message: 'Employee ID already exists or invalid data.' });
  }
});


// Display All Employees
router.get('/list', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.render('templates/list', { employees });
  } catch (error) {
    res.status(500).render('error', { message: 'Failed to fetch employees.' });
  }
});


// Delete the employee
router.delete('/delete/:id', async (req, res) => {
  try {
    const employeeID = req.params.id; 
    await Employee.deleteOne({ employeeID: employeeID }); 
    res.redirect('/employee/list'); 
  } catch (error) {
    res.status(500).render('error', { message: 'Failed to delete employee.' });
  }
});


module.exports = router;