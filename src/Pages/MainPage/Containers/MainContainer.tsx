import { useState } from "react";

import { Task } from "../../../types/Task";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";

const MainContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([task,...tasks ]);
  };

  const deleteTask = (id : string) => {
    setTasks (prevTasks => prevTasks.filter (task => task.id !== id))
  }

  const toggleCompletedTask = (id: string) => {
    setTasks ((prevTasks) => {
      return prevTasks.map(task => 
        task.id == id? {...task, completed: !task.completed} : task
      )
    })
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <>
      <h1 className="App">To Do Application</h1>
      <TaskForm addTask={addTask} />
      <TaskList sortedTasks={sortedTasks} deleteTask = {deleteTask} toggleCompletedTask = {toggleCompletedTask}/>
    </>
  );
};
export default MainContainer;
