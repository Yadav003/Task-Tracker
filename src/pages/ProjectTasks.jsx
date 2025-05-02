import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectTasks.css';

const ProjectTasks = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Todo',
  });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/tasks/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/tasks`,
        { ...form, projectId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ title: '', description: '', status: 'Todo' });
      fetchTasks();
    } catch (err) {
      alert('Task creation failed');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  return (
    <div className="task-page">
      <h2>Project Tasks</h2>
      <form onSubmit={handleCreateTask} className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: <strong>{task.status}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTasks;
