const Employee = require('../models/employee');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const { name, age, designation } = req.body;
    if (!name || !age || !designation) {
      return res.status(400).json({ message: 'Name, age, and designation are required' });
    }
    const employee = await Employee.create({ name, age, designation });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, age, designation } = req.body;
    if (!name && !age && !designation) {
      return res.status(400).json({ message: 'At least one field is required' });
    }
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, age, designation },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
