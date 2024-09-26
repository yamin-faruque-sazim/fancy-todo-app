import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Text,
  Button,
  Group,
  Paper,
  TextInput,
  Select,
} from "@mantine/core";
import useTaskOperations from "@/shared/utils/usetaskOperations";
import { PRIORITY_OPTIONS } from "@/shared/constants/taskContstants";

import classes from "./TaskDetails.module.css";
import { Task } from "../HomePage/types/Task";


const TaskDetails = () => {
  const router = useRouter();
  const { taskId } = router.query;

  const { getTaskById, saveTask, deleteTask, toggleCompletedTask } =
    useTaskOperations();

  const [isEditing, setIsEditing] = useState(false);
  const [editFormState, setEditFormState] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: 1,
  });

  const task =
    taskId && typeof taskId === "string" ? getTaskById(taskId) : null;

  useEffect(() => {
    if (task) {
      setEditFormState({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.toISOString().split("T")[0],
        priority: task.priority,
      });
    }
  }, [task]);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    if (task) {
      const updatedTask: Task = {
        ...task,
        title: editFormState.title,
        description: editFormState.description,
        dueDate: new Date(editFormState.dueDate),
        priority: editFormState.priority,
      };
      saveTask(updatedTask);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      router.push("/todo");
    }
  };

  const handleComplete = () => {
    if (task) {
      toggleCompletedTask(task.id);
    }
  };

  if (!task) return <p>Task not found</p>;

  return (
    <Container className={classes.taskContainer}>
      {isEditing ? (
        <Paper p="md" style={{ maxWidth: 600, margin: "0 auto" }}>
          <TextInput
            name="title"
            value={editFormState.title}
            onChange={handleEditChange}
            placeholder="Title"
            label="Title"
          />
          <TextInput
            name="description"
            value={editFormState.description}
            onChange={handleEditChange}
            placeholder="Description"
            label="Description"
            mt="md"
          />
          <TextInput
            type="date"
            name="dueDate"
            value={editFormState.dueDate}
            onChange={handleEditChange}
            label="Due Date"
            mt="md"
          />
          <Select
            name="priority"
            value={editFormState.priority.toString()}
            onChange={(value) => {
              if (value) {
                setEditFormState((prev) => ({
                  ...prev,
                  priority: parseInt(value, 10),
                }));
              }
            }}
            data={PRIORITY_OPTIONS}
            label="Priority"
            mt="md"
          />
          <Group mt="md">
            <Button onClick={handleEditSubmit} color="green">
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Group>
        </Paper>
      ) : (
        <div>
          <Text
            td={task.completed ? "line-through" : "none"}
            className={classes.taskTitle}
          >
            Title: {task.title}
          </Text>
          <Text
            td={task.completed ? "line-through" : "none"}
            className={classes.taskDescription}
          >
            Description: {task.description}
          </Text>
          <Text
            td={task.completed ? "line-through" : "none"}
            className={classes.taskPriority}
          >
            Priority:{" "}
            {task.priority === 1
              ? "High"
              : task.priority === 2
              ? "Medium"
              : "Low"}
          </Text>
          <Text
            td={task.completed ? "line-through" : "none"}
            className={classes.taskDueDate}
          >
            Due Date: {task.dueDate.toDateString()}
          </Text>
          <Group className={classes.taskButtons} mt="md">
            <Button
              color="green"
              style={{ display: task.completed ? "none" : "inline-block" }}
              onClick={handleComplete}
            >
              Complete
            </Button>
            <Button
              style={{ display: task.completed ? "none" : "inline-block" }}
              onClick={() => setIsEditing(true)}
              ml="md"
            >
              Edit
            </Button>
            <Button
              style={{ display: task.completed ? "none" : "inline-block" }}
              onClick={handleDelete}
              color="red"
              ml="md"
            >
              Delete
            </Button>
            <Button onClick={() => router.push("/todo")}>
              Back to Task List
            </Button>
          </Group>
        </div>
      )}
    </Container>
  );
};

export default TaskDetails;
