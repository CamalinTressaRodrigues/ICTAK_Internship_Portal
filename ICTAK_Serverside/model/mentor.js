const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Define Mentor Schema
const mentorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
   projectTopics: [String] // Store topics as strings
});

// Pre-save middleware to hash the password before saving
mentorSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to compare input password with hashed password
mentorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export Mentor model
const Mentor = mongoose.model('mentor', mentorSchema); // Note the uppercase 'M'
module.exports = Mentor;
