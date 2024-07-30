import { useState, useEffect } from "react";

import { Button, Container } from "@mantine/core";

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
  const [history, setHistory] = useState<Task[][]>([]);
  const [redoArray, setRedoArray] = useState<Task[][]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
    setTasks((prevTasks) => [task, ...prevTasks]);
    setRedoArray([]);
  };

  const deleteTask = (id: string) => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setRedoArray([]);
  };

  const toggleCompletedTask = (id: string) => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setRedoArray([]);
  };

  const deleteCompletedTasks = () => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    setRedoArray([]);
  };

  const startEditingTask = (id: string) => {
    setEditingTaskId(id);
  };

  const saveTask = (updatedTask: Task) => {
    setHistory((prevHistory) => [...prevHistory, tasks]);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTaskId(null);
    setRedoArray([]);
  };

  const undo = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 0) {
        const lastState = prevHistory[prevHistory.length - 1];
        setRedoArray((prevRedoState) => [...prevRedoState, tasks]);
        setTasks(lastState);
        return prevHistory.slice(0, prevHistory.length - 1);
      }
      return prevHistory;
    });
  };

  const redo = () => {
    setRedoArray((prevRedoState) => {
      if (prevRedoState.length > 0) {
        const nextState = prevRedoState[prevRedoState.length - 1];
        setHistory((prevHistory) => [...prevHistory, tasks]);
        setTasks(nextState);
        return prevRedoState.slice(0, prevRedoState.length - 1);
      }
      return prevRedoState;
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
          .filter((task) => !task.completed)
          .filter((task) => task.priority === 1);
      case "medium":
        return tasks
          .filter((task) => !task.completed)
          .filter((task) => task.priority === 2);
      case "low":
        return tasks
          .filter((task) => !task.completed)
          .filter((task) => task.priority === 3);

      default:
        return tasks;
    }
  };

  const filteredTasks = applyFilter(tasks, filter);

  return (
    <Container>
      <h1 className="App">To Do Application</h1>
      <TaskForm
        addTask={addTask}
        deleteCompletedTasks={deleteCompletedTasks}
        setFilter={setFilter}
        filter={filter}
      />
      <Button
        disabled={history.length === 0}
        onClick={undo}
        mb={10}
        color={`var(--mantine-color-violet-5)`}
      >
        Undo
      </Button>
      <Button
        disabled={redoArray.length === 0}
        onClick={redo}
        mb={10}
        color={`var(--mantine-color-pink-5)`}
        ml={10}
      >
        Redo
      </Button>
      <TaskList
        sortedTasks={filteredTasks}
        deleteTask={deleteTask}
        toggleCompletedTask={toggleCompletedTask}
        startEditingTask={startEditingTask}
        editingTaskId={editingTaskId}
        saveTask={saveTask}
      />
    </Container>
  );
};

export default MainContainer;
