import { useState, useEffect } from "react";
import { Task } from "../../../types/Task";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";

const MainContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("my-tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks).map((task: Task) => ({
        ...task,
        dueDate: new Date(task.dueDate),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleCompletedTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteCompletedTask = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <>
      <h1 className="App">To Do Application</h1>
      <TaskForm addTask={addTask} deleteCompletedTask={deleteCompletedTask} />
      <TaskList
        sortedTasks={sortedTasks}
        deleteTask={deleteTask}
        toggleCompletedTask={toggleCompletedTask}
      />
    </>
  );
};

export default MainContainer;
