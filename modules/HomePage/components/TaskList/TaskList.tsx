import React, { useState, useEffect } from "react";
import Link from "next/link";

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

import { Task } from "../../types/Task";
import classes from "./TaskList.module.css";
import { PRIORITY_OPTIONS } from "@/shared/constants/taskContstants";

interface TaskListProps {
  sortedTasks: Task[];
  deleteTask: (id: string) => void;
  toggleCompletedTask: (id: string) => void;
  startEditingTask: (id: string) => void;
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
    priority: number;
  }>({ title: "", description: "", dueDate: "", priority: 1 });

  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = sortedTasks.find((task) => task.id === editingTaskId);
      if (taskToEdit) {
        setEditFormState({
          title: taskToEdit.title,
          description: taskToEdit.summary,
          dueDate: taskToEdit.dueDate.toISOString().split("T")[0],
          priority: taskToEdit.priority,
        });
      }
    }
  }, [editingTaskId, sortedTasks]);

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
    const updatedTask: Task = {
      ...task,
      title: editFormState.title,
      summary: editFormState.description,
      dueDate: new Date(editFormState.dueDate),
      priority: editFormState.priority,
    };
    saveTask(updatedTask);
    setEditFormState({ title: "", description: "", dueDate: "", priority: 1 });
  };

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

      {sortedTasks.map((task) => (
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
                Description: {task.summary}
              </Text>
              <Group td={task.completed ? "line-through" : "none"}>
                <Text className={classes.taskPriority}>
                  Priority:{" "}
                  {task.priority === 1
                    ? "High"
                    : task.priority === 2
                    ? "Medium"
                    : "Low"}
                </Text>
                <Text className={classes.taskDueDate}>
                  Due Date: {task.dueDate.toDateString()}
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
              />
              <Button onClick={() => handleEditSubmit(task)}>Save</Button>
            </div>
          ) : (
            <Group className={classes.taskButtons}>
              <Button
                color="red"
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => openModalHandler(task.id)}
              >
                Delete
              </Button>
              <Button
                color="green"
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => isCompleteHandler(task.id)}
              >
                Complete
              </Button>
              <Button
                color="orange"
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => startEditingTask(task.id)}
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
