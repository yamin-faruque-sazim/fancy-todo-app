import { useState } from "react";

import { Task } from "../../../types/Task";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";

const MainContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <>
      <h1 className="App">To Do Application</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
    </>
  );
};
export default MainContainer;