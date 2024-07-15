import React, { useState } from "react";

import { Container, Button, Group, Divider, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Task } from "../../../types/Task";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

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
      {tasks.map((task) => (
        <Container key={task.id} p="md" mb="md">
          <h3>Title: {task.title}</h3>
          <p>Description: {task.summary}</p>
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
          <Button onClick={() => openModalHandler(task.id)} color="red">
            Delete
          </Button>
          <Divider mt={30} size="xs" />
        </Container>
      ))}
    </div>

  );
  
};

export default TaskList;
