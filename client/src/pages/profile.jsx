import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import CreateTask from '../components/CreateTask';
import TaskList from '../components/TaskList';

function Profile() {
  return (
    <HomeLayout>
      <h1>Welcome to the Profile Page!</h1>
      <CreateTask/>
      <TaskList/>
    </HomeLayout>
  );
}

export default Profile;
