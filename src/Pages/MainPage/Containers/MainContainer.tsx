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

  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

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

  const deleteCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const startEditingTask = (id: string) => {
    setEditingTaskId(id);
  };

  const saveTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTaskId(null);
  };

  const applyFilter = (tasks: Task[], filter: string): Task[] => {
    switch (filter) {
      case "all":
        return tasks.sort((a, b) => {
          if (a.completed && !b.completed) return 1;
          if (!a.completed && b.completed) return -1;
          return 0;
        });
      case "priority-high-low":
        return tasks
          .filter((task) => !task.completed)
          .sort((a, b) => a.priority - b.priority);
      case "priority-low-high":
        return tasks
          .filter((task) => !task.completed)
          .sort((a, b) => b.priority - a.priority);
      case "due-date-asc":
        return tasks
          .filter((task) => !task.completed)
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      case "completed":
        return tasks.filter((task) => task.completed);
      case "active":
        return tasks.filter((task) => !task.completed);
      case "high":
        return tasks
        .filter ((task) => !task.completed)
        .filter((task) => task.priority === 1);
      case "medium":
        return tasks
        .filter ((task) => !task.completed)
        .filter((task) => task.priority === 2);
      case "low":
        return tasks
        .filter ((task) => !task.completed)
        .filter((task) => task.priority === 3);

      default:
        return tasks;
    }
  };

  const filteredTasks = applyFilter(tasks, filter);

  return (
    <>
      <h1 className="App">To Do Application</h1>
      <TaskForm
        addTask={addTask}
        deleteCompletedTasks={deleteCompletedTasks}
        setFilter={setFilter}
        filter={filter}
      />
      <TaskList
        sortedTasks={filteredTasks}
        deleteTask={deleteTask}
        toggleCompletedTask={toggleCompletedTask}
        startEditingTask={startEditingTask}
        editingTaskId={editingTaskId}
        saveTask={saveTask}
      />
    </>
  );
};

export default MainContainer;
