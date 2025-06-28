const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true
  },
  phone: {
  type: String,
  required: [true, 'Please provide phone number'],
  unique: true,
  trim: true,
  match: [/^\+?[0-9]{10,15}$/, 'Please provide a valid phone number']
},
  salary: {
    type: Number,
    required: [true, 'Please provide salary']
  },
  role: {
  type: String,
  enum: ['admin', 'hr', 'employee'],
  default: 'employee'
},
isActive: {
  type: Boolean,
  default: true
},
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Employer', EmployerSchema);