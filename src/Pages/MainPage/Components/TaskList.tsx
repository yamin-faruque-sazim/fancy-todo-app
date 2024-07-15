import React from "react";

import { Container, Button, Group, Divider } from "@mantine/core";

import { Task } from "../../../types/Task";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask }) => {
  return (
    <div>
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
          <Button onClick = { () => deleteTask(task.id)} color="red">Delete</Button>
          <Divider mt={30} size="xs" />
        </Container>
      ))}
    </div>

  );
  
};

export default TaskList;
