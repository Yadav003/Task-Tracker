import './Dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Dashboard = ({ setAuth }) => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      alert('Failed to fetch projects');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/projects', { name, description });
      setName('');
      setDescription('');
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating project');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/');
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Welcome to Your Dashboard</h2>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>

        <form onSubmit={handleCreate} className="project-form" style={{ marginTop: '30px' }}>
          <h3>Create New Project</h3>
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Create Project</button>
        </form>

        <div style={{ marginTop: '40px' }}>
          <h3>Your Projects</h3>
          {projects.length === 0 ? (
            <p>No projects yet.</p>
          ) : (
            projects.map((proj) => (
              <div className="project-card" key={proj._id}>
                <h4>{proj.name}</h4>
                <p>{proj.description}</p>
                <button className="view-task-button" onClick={() => navigate(`/project/${proj._id}`)}>
                  View Tasks
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
