import React, { useState } from "react";

import { DateInput } from "@mantine/dates";
import { Container, Select, TextInput, Button, Group } from "@mantine/core";
import "@mantine/dates/styles.css";

import { Task } from "../../../types/Task";
import "./styles.css";

interface TaskFormProps {
  addTask: (task: Task) => void;
  deleteCompletedTask: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  addTask,
  deleteCompletedTask,
}) => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [priority, setPriority] = useState<number>(2);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !priority || !dueDate) {
      alert("Please fill in all fields");
      return;
    }
    const newTask: Task = {
      id: new Date().toISOString(),
      title,
      summary,
      priority,
      dueDate,
      completed: false,
    };
    addTask(newTask);
    setTitle("");
    setSummary("");
    setPriority(2);
    setDueDate(null);
  };

  return (
    <Container
      className="formContainer"
      bg="var(--mantine-color-dark-5)"
      h="auto"
      mt={50}
      pb={15}
    >
      <form onSubmit={handleSubmit}>
        <Group>
          <TextInput
            size="md"
            className="titleInput"
            label="Title"
            placeholder="Give a title for your task"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          />

          <TextInput
            mt={10}
            size="md"
            className="summaryInput"
            label="Description"
            placeholder="Enter a brief desription for your task"
            value={summary}
            onChange={(e) => setSummary(e.currentTarget.value)}
            required
          />
        </Group>
        <Group>
          <Select
            mt={10}
            className="selectInput"
            label="Priority"
            value={String(priority)}
            onChange={(value) => setPriority(Number(value))}
            data={[
              { value: "1", label: "High" },
              { value: "2", label: "Medium" },
              { value: "3", label: "Low" },
            ]}
            required
          />
          <DateInput
            mt={10}
            className="selectDate"
            label="Due Date"
            placeholder="Pick a date"
            value={dueDate}
            onChange={setDueDate}
          />
        </Group>
        <Group mt={15}>
          <Button type="submit">Add Task</Button>
          <Button>Filter tasks</Button>
          <Button onClick={deleteCompletedTask}>Clear Completed</Button>
        </Group>
      </form>
    </Container>
  );
};
export default TaskForm;
