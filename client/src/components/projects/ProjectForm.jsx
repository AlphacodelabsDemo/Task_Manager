import React, { useState } from 'react';

const ProjectForm = ({ onSubmit }) => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    dueDate: '',
    collaborators: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(project);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={project.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={project.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={project.dueDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="collaborators">Collaborators:</label>
        <input
          type="text"
          id="collaborators"
          name="collaborators"
          value={project.collaborators}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default ProjectForm;
