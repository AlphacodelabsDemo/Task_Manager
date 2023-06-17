import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import CreateTask from '../components/tasks/CreateTask';
import TaskList from '../components/tasks/TaskList';

function Task() {
  return (
    <>
     <HomeLayout> 
      <CreateTask/>
      <TaskList/>
    </HomeLayout> 
    </>

  );
}

export default Task;