import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader } from "@mantine/core";
import { useGetTodosQuery, useUpdateTodoMutation } from "@/services/todoApi";

import {
  Container,
  Button,
  Group,
  Divider,
  Modal,
  Text,
  TextInput,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from '@mantine/notifications';

import { PRIORITY_OPTIONS } from "@/shared/constants/taskContstants";
import { Task } from "../../types/Task";
import classes from "./TaskList.module.css";

interface TaskListProps {
  sortedTasks: Task[];
  deleteTask: (id: string) => void;
  toggleCompletedTask: (id: string) => void;
  startEditingTask: (id: string | null) => void;
  editingTaskId: string | null;
  saveTask: (updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  sortedTasks,
  deleteTask,
  toggleCompletedTask,
  startEditingTask,
  editingTaskId,
  saveTask,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
  const [editFormState, setEditFormState] = useState<{
    title: string;
    description: string;
    dueDate: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
  }>({ title: "", description: "", dueDate: "", priority: "MEDIUM" });

  const { data: todos, isLoading } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();

  const [localTodos, setLocalTodos] = useState<Task[]>([]);

  useEffect(() => {
    if (todos) {
      setLocalTodos(todos);
    }
  }, [todos]);

  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = localTodos.find((task) => task.id === editingTaskId);

      if (taskToEdit) {
        const dueDate =
          taskToEdit.dueDate instanceof Date
            ? taskToEdit.dueDate.toISOString().split("T")[0]
            : "";

        setEditFormState({
          title: taskToEdit.title,
          description: taskToEdit.description,
          dueDate: dueDate,
          priority: taskToEdit.priority || "MEDIUM",
        });
      }
    }
  }, [editingTaskId, localTodos]);

  const openModalHandler = (id: string) => {
    setTaskIdToDelete(id);
    open();
  };

  const deleteTaskHandler = () => {
    if (taskIdToDelete) {
      deleteTask(taskIdToDelete);
      close();
      setTaskIdToDelete(null);
    }
  };

  const isCompleteHandler = (id: string) => {
    toggleCompletedTask(id);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (task: Task) => {
    const priorityMapping: { [key: number]: "HIGH" | "MEDIUM" | "LOW" } = {
      1: "HIGH",
      2: "MEDIUM",
      3: "LOW",
    };

    const updatedTask: Partial<Task> = {
      title: editFormState.title || task.title,
      description: editFormState.description || task.description,
      dueDate: editFormState.dueDate
        ? new Date(editFormState.dueDate)
        : task.dueDate,
      priority:
        priorityMapping[Number(editFormState.priority)] || task.priority,
    };

    setLocalTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === task.id ? { ...t, ...updatedTask } : t))
    );

    updateTodo({
      id: task.id,
      ...updatedTask,
    })
      .unwrap()
      .then(() => {
        notifications.show({
          title: 'Success!',
          message: 'Task successfully updated.',
          color: 'green'
        })

        setEditFormState({
          title: "",
          description: "",
          dueDate: "",
          priority: "MEDIUM",
        });

        startEditingTask(null);
      })
      .catch((error) => {
        console.error("Failed to update task:", error);
      });
  };
  if (isLoading) {
    return <Loader size="xl" />;
  }

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Are you sure?" centered>
        <Group>
          <Button onClick={deleteTaskHandler} color="red">
            Yes
          </Button>
          <Button onClick={close}>No</Button>
        </Group>
      </Modal>

      {localTodos?.map((task) => (
        <Container
          key={task.id}
          pt={10}
          mb="md"
          className={classes.taskContainer}
        >
          <Link className={classes.taskLink} href={`/task/${task.id}`} passHref>
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
                mt={15}
              >
                Description: {task.description}
              </Text>
              <Group td={task.completed ? "line-through" : "none"}>
                <Text className={classes.taskPriority}>
                  Priority: {task.priority}
                </Text>
                <Text className={classes.taskDueDate}>
                  Due Date: {task.dueDate ? new Date(task.dueDate).toDateString() : "No due date"}
                </Text>
              </Group>
            </div>
          </Link>
          {editingTaskId === task.id ? (
            <div>
              <TextInput
                name="title"
                value={editFormState.title}
                onChange={handleEditChange}
                placeholder="Title"
              />
              <TextInput
                name="description"
                value={editFormState.description}
                onChange={handleEditChange}
                placeholder="Description"
              />
              <TextInput
                type="date"
                name="dueDate"
                value={editFormState.dueDate}
                onChange={handleEditChange}
              />
              <Select
                name="priority"
                value={editFormState.priority}
                onChange={(value) => {
                  if (value) {
                    setEditFormState((prev) => ({
                      ...prev,
                      priority: value as "HIGH" | "MEDIUM" | "LOW",
                    }));
                  }
                }}
                data={PRIORITY_OPTIONS}
                placeholder="Select priority"
              />
              <Button onClick={() => handleEditSubmit(task)}>Save</Button>
            </div>
          ) : (
            <Group className={classes.taskButtons}>
              <Button
                color="red"
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => openModalHandler(task.id ?? "")}
              >
                Delete
              </Button>
              <Button
                color="green"
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => isCompleteHandler(task.id ?? "")}
              >
                Complete
              </Button>
              <Button
                color="orange"
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => startEditingTask(task.id ?? "")}
              >
                Edit
              </Button>
            </Group>
          )}
          <Divider my="sm" />
        </Container>
      ))}
    </div>
  );
};

export default TaskList;
