import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    
    const count = await Project.countDocuments({ userId: req.userId });
    if (count >= 4) {
      return res.status(400).json({ message: 'Project limit reached (4 max)' });
    }

    const project = new Project({
      name,
      description,
      userId: req.userId,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId });
    res.status(200).json(projects);
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
