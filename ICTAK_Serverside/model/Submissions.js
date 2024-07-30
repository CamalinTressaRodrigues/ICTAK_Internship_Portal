const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  
  topic: {
    type: String,
    required: true
  },
  evaluationStatus: {
    type: Boolean,
    required: true,default: false 
  },
  projectTopic: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
      default: 0 // Default value can be adjusted as needed
  },
  comments: {
    type: String,
    default: '' // Default value can be adjusted as needed
  }
});

module.exports = mongoose.model('submissiondb', submissionSchema);
// const Submission = mongoose.models.submissiondb || mongoose.model('submissiondb', submissionSchema);

// module.exports = Submission;
