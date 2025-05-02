import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import './ProjectTask.css';

const ProjectTask = () => {
  const { taskId } = useParams(); 
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Todo',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/${taskId}`);
        setTask(res.data);
      } catch (err) {
        alert('Failed to fetch task');
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tasks/${taskId}`, task);
      alert('Task updated');
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="project-task-container">
      <div className="project-task-content">
        <h2>Edit Task</h2>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          />

          <select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button type="submit">Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default ProjectTask;
