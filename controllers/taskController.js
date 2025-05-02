import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const { title, description, status, projectId } = req.body;

  try {
    const task = new Task({ title, description, status, projectId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
