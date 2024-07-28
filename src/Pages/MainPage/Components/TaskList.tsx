import React, { useState, useEffect } from "react";
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
import { Task } from "../../../types/Task";

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
          td={task.completed ? "line-through" : "none"}
          key={task.id}
          p="md"
          mb="md"
        >
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
                data={[
                  { value: "1", label: "High" },
                  { value: "2", label: "Medium" },
                  { value: "3", label: "Low" },
                ]}
              />
              <Button onClick={() => handleEditSubmit(task)}>Save</Button>
            </div>
          ) : (
            <div>
              <Text>Title: {task.title}</Text>
              <Text mt={15}>Description: {task.summary}</Text>
              <Group>
                <p>
                  Priority:{" "}
                  {task.priority === 1
                    ? "High"
                    : task.priority === 2
                    ? "Medium"
                    : "Low"}
                </p>
                <p>Due Date: {task.dueDate.toDateString()}</p>
              </Group>
              <Button
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => openModalHandler(task.id)}
                color="red"
              >
                Delete
              </Button>
              <Button
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => isCompleteHandler(task.id)}
                ml={10}
                color="green"
              >
                Complete
              </Button>
              <Button
                style={{ display: task.completed ? "none" : "inline-block" }}
                onClick={() => startEditingTask(task.id)}
                ml={10}
              >
                Edit
              </Button>
              <Divider mt={30} size="xs" />
            </div>
          )}
        </Container>
      ))}
    </div>
  );
};

export default TaskList;
