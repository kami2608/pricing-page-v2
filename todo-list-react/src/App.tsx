import "./App.css";
import TaskInput from "./components/TaskInput";
import SearchBar from "./components/SearchBar";
import TaskTable from "./components/TaskTable";
import { useEffect, useState } from "react";
import { getTaskListFromMockAPI } from "./services/getTasks.api";
import type { Task } from "./types/task.types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTasks = async () => {
      const taskList = await getTaskListFromMockAPI(controller.signal);
      if (!controller.signal.aborted && taskList) {
        taskList.reverse();
        setTasks(taskList);
        setIsLoading(false);
      }
    };
    fetchTasks();
    return () => controller.abort();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <TaskInput setTasks={setTasks} />
      <SearchBar setTasks={setTasks} setIsLoading={setIsLoading} />
      <TaskTable tasks={tasks} isLoading={isLoading} setTasks={setTasks} />
    </>
  );
}

export default App;
