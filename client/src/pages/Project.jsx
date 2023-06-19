import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import ProjectLayout from '../layouts/ProjectLaypot';
// import CreateTask from '../components/tasks/CreateTask';
// import TaskList from '../components/tasks/TaskList';
import CreateProject from '../components/projects/CreateProjrct';
import ProjectList from '../components/projects/ProjectList';

function Project() {
  return (
    <ProjectLayout>
      <h1>Project Page!</h1>
      <CreateProject/>
      <ProjectList/>
    </ProjectLayout>
  );
}

export default Project;
