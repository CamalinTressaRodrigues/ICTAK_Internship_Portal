const Submission = require('../model/Submissions');

exports.getSubmissions = async (req, res) => {
  try {
    const { batch, topic } = req.query;
    const { projectTopic } = req.params;

    let filter = { projectTopic }; // Start with filtering by projectTopic
    if (batch) filter.batch = batch;
    if (topic) filter.topic = topic;

    const submissions = await Submission.find(filter); // Use the filter object here
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getdata =  async (req, res) => {
  try {
    console.log('Fetching submission with ID:', req.params.id);
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      console.log('Submission not found');
      return res.status(404).json({ msg: 'Submission not found' });
    }
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete submission with ID: ${id}`); // Log the ID being processed
    const deletedSubmission = await Submission.findByIdAndDelete(id);
    
    if (!deletedSubmission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    console.log(`Submission with ID: ${id} deleted successfully`);
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    console.error(`Error deleting submission with ID: ${id}`, error);
    res.status(500).json({ error: 'Error deleting submission' });
  }
};
exports.evaluateSubmission = async (req, res) => {
  const { id } = req.params;
  const { marks, comments } = req.body;

  try {
    const submission = await Submission.findById(id);
    if (!submission) {
      return res.status(404).json({ msg: 'Submission not found' });
    }

    if (submission.evaluationStatus) {
      return res.status(400).json({ msg: 'Submission already evaluated' });
    }

    if (!marks) {
      return res.status(400).json({ msg: 'Marks cannot be empty!' });
    }

    submission.marks = marks;
    submission.comments = comments;
    submission.evaluationStatus = true; // Set evaluationStatus to completed

    await submission.save();
    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// New function to get a single submission by ID
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// New function to update a submission
exports.updateSubmission = async (req, res) => {
  try {
    const { marks, comments } = req.body;
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.marks = marks;
    submission.comments = comments;

    await submission.save();
    res.status(200).json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};