import React from 'react';
import { Link } from 'react-router-dom';

const CreateDropdown = () => {
  return (
    <ul className="absolute mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
      <li>
        <Link to="/tasks/add" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
          Tasks
          <span className="text-sm text-gray-500">Create a task</span>
        </Link>
      </li>
      <li>
        <Link to="/projects/add" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
          Projects
          <span className="text-sm text-gray-500">Create a project</span>
        </Link>
      </li>
      <li>
        <Link to="/workspace/add" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
          Workspace
          <span className="text-sm text-gray-500">Group of projects</span>
        </Link>
      </li>
    </ul>
  );
};

export default CreateDropdown;
