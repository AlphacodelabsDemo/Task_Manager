import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import CreateTask from '../../components/tasks/CreateTask';
import TaskList from '../../components/tasks/TaskList';

const TaskPage = () => {
    return(
        <>
    <HomeLayout> 
        <CreateTask/>
        <TaskList/>
    </HomeLayout> 
        </>
    )
}

export default TaskPage