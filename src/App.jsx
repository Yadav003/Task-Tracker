import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProjectTasks from './pages/ProjectTasks';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login setAuth={setIsAuthenticated} />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/" />
        }
      />
      <Route
        path="/project/:id"
        element={
          isAuthenticated ? <ProjectTasks /> : <Navigate to="/" />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
