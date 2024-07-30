const Mentor = require('../model/mentor');
const Project = require('../model/projects');
const bcrypt = require('bcryptjs');

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
    //  let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // let mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};


// Get all mentors with their project topics
const MentorsList = async (req, res) => {
  try {
    const mentors = await Mentor.find(); // No need to populate since projectTopics are now strings
    console.log(mentors);
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add a new mentor
const AddMentors = async (req, res) => {
  try {
    // Get the project  topics from the request body
    const topics = req.body.projectTopics;
    // const password = req.body.password;

    const { name, email, phone, password } = req.body;

    // Validate all fields
    if (!name || !email || !phone || !password || !topics) {
      return res.status(400).json({ message: 'All fields are mandatory.' });
    }
    // Validate the password
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password does not meet the required criteria' });
    }

     if (!validatePhoneNumber(phone)) {
      return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
    }

    // Fetch projects with the given topics
    const projects = await Project.find({ topic: { $in: topics } });

    // Check if all topics are valid
    if (topics.length !== projects.length) {
      const invalidTopics = topics.filter(topic =>
        !projects.some(project => project.topic === topic)
      );
      return res.status(400).json({ message: 'Invalid project topics', invalidTopics });
    }

    // Prepare new mentor data
    const newMentor = {
      name,
      email,
      phone,
      password,
      projectTopics: topics
    };
 
    // Create and save the new mentor
    const mentor = new Mentor(newMentor);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    console.error('Error adding mentor:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update an existing mentor
const updateMentor = async (req, res) => {
  try {
    // Extract the password from the request body, if present
    // let { password, ...updateData } = req.body;

    const { name, email, phone, password, projectTopics } = req.body;
    // Validate all fields
    if (!name || !email || !phone || !projectTopics.length) {
      return res.status(400).json({ message: 'All fields are mandatory. Phone number must be exactly 10 digits.' });
    }
     let updateData = { name, email, phone, projectTopics };

    //Check if password is provided and validate it
    if (password && !validatePassword(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long, include one uppercase letter, one number, and one special symbol." });
    }

    // If password is provided, hash it before updating
    if (password) {
      const saltRounds = 10;
      hashedpassword = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedpassword;
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(req.params.id, updateData, { new: true });

    // Update the mentor with the new data
    // const updatedMentor = await Mentor.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedMentor) return res.status(404).json({ message: 'Mentor not found' });
    res.status(200).json(updatedMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete a mentor
const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor)
        return res.status(404).json({ message: 'Mentor not found' });
    res.status(200).json({ message: 'Mentor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { MentorsList, AddMentors, updateMentor, deleteMentor };
