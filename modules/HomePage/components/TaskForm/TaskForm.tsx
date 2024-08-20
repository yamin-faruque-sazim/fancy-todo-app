import React, { useState } from "react";

import { DateInput } from "@mantine/dates";
import { Container, Select, TextInput, Button, Group } from "@mantine/core";
import "@mantine/dates/styles.css";

import { Task } from "../../types/Task";
import classes from "./TaskForm.module.css";

interface TaskFormProps {
  addTask: (task: Task) => void;
  deleteCompletedTasks: () => void;
  setFilter: (filter: string) => void;
  filter: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  addTask,
  deleteCompletedTasks,
  setFilter,
  filter,
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
    <Container className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <Group>
          <TextInput
            styles={{
              input: {
                backgroundColor: "#191a1b",
              },
              label: {
                marginBottom: "10px",
              },
            }}
            size="md"
            className={classes.titleInput}
            label="Title"
            placeholder="Give a title for your task"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          />
          <TextInput
            styles={{
              input: {
                backgroundColor: "#191a1b",
              },
              label: {
                marginBottom: "10px",
              },
            }}
            mt={10}
            size="md"
            className={classes.summaryInput}
            label="Description"
            placeholder="Enter a brief description for your task"
            value={summary}
            onChange={(e) => setSummary(e.currentTarget.value)}
            required
          />
        </Group>
        <Group>
          <Select
            styles={{
              input: {
                backgroundColor: "#191a1b",
              },
              label: {
                marginBottom: "10px",
              },
            }}
            mt={10}
            className={classes.selectInput}
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
            styles={{
              input: {
                backgroundColor: "#191a1b",
              },
              label: {
                marginBottom: "10px",
              },
            }}
            mt={10}
            className={classes.selectDate}
            label="Due Date"
            placeholder="Pick a date"
            value={dueDate}
            onChange={setDueDate}
          />
        </Group>
        <Group mt={10}>
          <Button className={classes.formButton} type="submit">
            Add Task
          </Button>
          <Button className={classes.formButton} onClick={deleteCompletedTasks}>
            Clear Completed
          </Button>
          <Select
            styles={{
              input: {
                backgroundColor: "#191a1b",
              },
              label: {
                marginBottom: "10px",
              },
            }}
            mb={20}
            label="Filter"
            placeholder="Filter Tasks"
            data={[
              { value: "all", label: "All" },
              { value: "priority-high-low", label: "Priority (High-Low)" },
              { value: "priority-low-high", label: "Priority (Low-High)" },
              { value: "due-date-asc", label: "Due Date (Earliest First)" },
              { value: "completed", label: "Completed" },
              { value: "active", label: "Active" },
              { value: "high", label: "High Priority" },
              { value: "medium", label: "Medium Priority" },
              { value: "low", label: "Low Priority" },
            ]}
            value={filter}
            onChange={(value) => setFilter(value || "")}
          />
        </Group>
      </form>
    </Container>
  );
};
export default TaskForm;
