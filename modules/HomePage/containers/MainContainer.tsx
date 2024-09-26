import { Container, Button, Group } from "@mantine/core";
import useTaskOperations from "@/shared/utils/usetaskOperations";

import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";


const MainContainer: React.FC = () => {
  const {
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
  } = useTaskOperations();

  return (
    <Container>
      <h1 className="App">To Do Application</h1>
      <TaskForm
        addTask={addTask}
        deleteCompletedTasks={deleteCompletedTasks}
        setFilter={setFilter}
        filter={filter}
      />
      <Group mb={10} style={{ justifyContent: "center" }}>
        <Button
          w={100}
          disabled={!history.length}
          onClick={undo}
          mb={10}
          color="violet"
        >
          Undo
        </Button>
        <Button
          w={100}
          disabled={!redoArray.length}
          onClick={redo}
          mb={10}
          color="pink"
          ml={10}
        >
          Redo
        </Button>
      </Group>
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
