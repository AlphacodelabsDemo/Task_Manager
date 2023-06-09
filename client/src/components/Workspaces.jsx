import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Workspaces = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects/add'); 
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Workspaces</h1>
      <div className="grid gap-4">
        {projects.map(project => (
          <div key={project.id} className="p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold">{project.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspaces;
