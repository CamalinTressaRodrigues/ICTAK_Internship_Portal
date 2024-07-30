const projlist = require('../model/projects');

const ProjectsList = async (req, res) => {   
    try {
        const projectslist = await projlist.find({});   
        //  console.log(projectslist);  
        res.status(200).json(projectslist);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
}

const addProject = async (req, res) => {
    try {
        //  console.log(req.body);
        var newProject = {
            topic : req.body.topic,
            // stack: req.body.stack,
            duration: req.body.duration
        }
        var Project = new projlist(newProject)
        await Project.save();
        res.status(201).json(newProject)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
}
}

const updateProject = async (req, res) => {
  try {
    const project = await projlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      // If the project is not found, return a 404 response
      return res.status(404).json({ message: 'Project not found' });
    }

    // If the project is found and updated, return the updated project
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    // In case of an error, return a 500 response
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteProject = async (req, res) => {
    try{
        const project = await projlist.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({message: "Project deleted successfully"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
}


module.exports = { ProjectsList, addProject, updateProject, deleteProject };