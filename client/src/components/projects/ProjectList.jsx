import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [editableProject, setEditableProject] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchUser();
  }, []);

  useEffect(() => {
    if (shouldUpdate) {
      fetchProjects();
    }
  }, [shouldUpdate]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/project/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data.projects);
      setShouldUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/project/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (project) => {
    setEditableProject(project);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8081/api/project/projects/${editableProject._id}`,
        editableProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditableProject(null);
      setShouldUpdate(true); // Trigger the update
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditableProject(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white">
      <h2 className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl text-center title p-12 animate-color-change">
        Project List
      </h2>
      <div className="relative">
        <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-pink-400 mb-16 rounded-full" />
      </div>
      {projects.length > 0 ? (
        <div className="flex flex-col items-center">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="border py-2 px-4">User Name</th>
                <th className="border py-2 px-4">Aim</th>
                <th className="border py-2 px-4">Due Date</th>
                <th className="border py-2 px-4">Collaborators</th>
                <th className="border py-2 px-4">Updated Status</th>
                <th className="border py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td className="border py-2 px-4">{project.userName}</td>
                  <td className="border py-2 px-4">{project.aim}</td>
                  <td className="border py-2 px-4">{project.dueDate}</td>
                  <td className="border py-2 px-4">{project.collaborators.join(', ')}</td>
                  <td className="border py-2 px-4">{project.updatedStatus}</td>
                  <td className="border py-2 px-4 flex justify-center gap-2">
                    <button onClick={() => handleEdit(project)} className="rounded-full bg-transparent">
                      <BsPencilSquare />
                    </button>
                    <button onClick={() => deleteProject(project._id)} className="rounded-full bg-transparent">
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editableProject && (
            <div>
              <input
                type="text"
                name="aim"
                value={editableProject.aim}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="dueDate"
                value={editableProject.dueDate}
                onChange={handleInputChange}
              />
              <select
                name="updatedStatus"
                value={editableProject.updatedStatus}
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
};

export default ProjectList;
