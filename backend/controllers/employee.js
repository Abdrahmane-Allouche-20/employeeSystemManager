const Employee = require('../models/employee');
const { StatusCodes } = require('http-status-codes');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        return res.status(StatusCodes.OK).json({ employees, count: employees.length });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const addEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        if (!newEmployee) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Employee not created' });
        }
        return res.status(StatusCodes.CREATED).json({ employee: newEmployee, message: 'Employee created' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const getSingleEmployee = async (req, res) => {
    try {
        const { id: employeeId } = req.params;
        const singleEmployee = await Employee.findOne({ _id: employeeId });
        if (!singleEmployee) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Employee not found' });
        }
        return res.status(StatusCodes.OK).json({ employee: singleEmployee });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id: employeeId } = req.params;
        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: employeeId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEmployee) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Employee not found' });
        }
        return res.status(StatusCodes.OK).json({ employee: updatedEmployee, message: 'Employee updated successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id: employeeId } = req.params;
        const deletedEmployee = await Employee.findOneAndDelete({ _id: employeeId });
        if (!deletedEmployee) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Employee not found' });
        }
        return res.status(StatusCodes.OK).json({ employee: deletedEmployee, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = {
    getAllEmployees,
    addEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
};