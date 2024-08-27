import { useState, useEffect } from "react";
import { Task } from "../../modules/HomePage/types/Task";

const useTaskOperations = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [history, setHistory] = useState<Task[][]>([]);
  const [redoArray, setRedoArray] = useState<Task[][]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const savedTasks = window.localStorage.getItem("my-tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(
        parsedTasks.map((task: Task) => ({
          ...task,
          dueDate: new Date(task.dueDate),
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && tasks.length > 0) {
      window.localStorage.setItem("my-tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const updateTasks = (newTasks: Task[]) => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
    setTasks(newTasks);
    setRedoArray([]);
  };

  const addTask = (task: Task) => {
    updateTasks([task, ...tasks]);
  };

  const deleteTask = (id: string) => {
    updateTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletedTask = (id: string) => {
    updateTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteCompletedTasks = () => {
    updateTasks(tasks.filter((task) => !task.completed));
  };

  const startEditingTask = (id: string) => {
    setEditingTaskId(id);
  };

  const saveTask = (updatedTask: Task) => {
    updateTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTaskId(null);
  };

  const undo = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 0) {
        const lastState = prevHistory[prevHistory.length - 1];
        setRedoArray((prevRedoArray) => [...prevRedoArray, tasks]);
        setTasks(lastState);
        return prevHistory.slice(0, prevHistory.length - 1);
      }
      return prevHistory;
    });
  };

  const redo = () => {
    setRedoArray((prevRedoArray) => {
      if (prevRedoArray.length > 0) {
        const nextState = prevRedoArray[prevRedoArray.length - 1];
        setHistory((prevHistory) => [...prevHistory, tasks]);
        setTasks(nextState);
        return prevRedoArray.slice(0, prevRedoArray.length - 1);
      }
      return prevRedoArray;
    });
  };

  const filterByStatus = (tasks: Task[], filter: string): Task[] => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed === true);
      case "active":
        return tasks.filter((task) => task.completed === false);
      default:
        return tasks;
    }
  };

  const filterByPriority = (tasks: Task[], filter: string): Task[] => {
    const activeTasks = tasks.filter((task) => !task.completed);
    switch (filter) {
      case "priority-high-low":
        return activeTasks.sort((a, b) => a.priority - b.priority);
      case "priority-low-high":
        return activeTasks.sort((a, b) => b.priority - a.priority);
      case "high":
        return activeTasks.filter((task) => task.priority === 1);
      case "medium":
        return activeTasks.filter((task) => task.priority === 2);
      case "low":
        return activeTasks.filter((task) => task.priority === 3);
      default:
        return tasks;
    }
  };

  const filterByDueDate = (tasks: Task[]): Task[] => {
    const activeTasks = tasks.filter((task) => !task.completed);
    return activeTasks.sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
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
      case "priority-low-high":
      case "high":
      case "medium":
      case "low":
        return filterByPriority(tasks, filter);

      case "completed":
      case "active":
        return filterByStatus(tasks, filter);

      case "due-date-asc":
        return filterByDueDate(tasks);

      default:
        return tasks;
    }
  };

  const filteredTasks = applyFilter(tasks, filter);

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find((task) => task.id === id);
  };
  return {
    tasks,
    filter,
    filteredTasks,
    addTask,
    deleteTask,
    toggleCompletedTask,
    deleteCompletedTasks,
    startEditingTask,
    saveTask,
    undo,
    redo,
    setFilter,
    editingTaskId,
    history,
    redoArray,
    getTaskById,
  };
};

export default useTaskOperations;
