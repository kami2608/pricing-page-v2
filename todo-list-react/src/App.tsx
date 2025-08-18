import "./App.css";
import TaskInput from "./components/TaskInput";
import SearchBar from "./components/SearchBar";
import TaskTable from "./components/TaskTable";
import { useEffect, useState } from "react";
import { getTaskListFromMockAPI } from "./services/getTasks.api";
import type { Task } from "./types/task.types";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./components/Button";

function App() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return "Loading...";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTasks = async () => {
      const taskList = await getTaskListFromMockAPI(controller.signal);
      if (!controller.signal.aborted && taskList) {
        taskList.reverse();
        setTasks(taskList);
        setIsDataLoading(false);
      }
    };
    fetchTasks();
    return () => controller.abort();
  }, []);

  return isAuthenticated ? (
    <>
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <div className="logout">
        <Button title="Logout" handleClick={logout} />
      </div>
      <TaskInput setTasks={setTasks} />
      <SearchBar setTasks={setTasks} setIsLoading={setIsDataLoading} />
      <TaskTable tasks={tasks} isLoading={isDataLoading} setTasks={setTasks} />
    </>
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}

      <Button title="Signup" handleClick={signup} />

      <Button title="Login" handleClick={login} />
    </>
  );
}

export default App;
