import { useEffect, useState } from "react";
import Button from "./components/Button";
import type { Task } from "./types/task.types";
import { getTaskListFromMockAPI } from "./services/getTasks.api";
import TaskInput from "./components/TaskInput";
import SearchBar from "./components/SearchBar";
import TaskTable from "./components/TaskTable";
import { useAuth0 } from "@auth0/auth0-react";

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const {
    getAccessTokenSilently,
    user,
    logout: auth0Logout,
    getIdTokenClaims,
  } = useAuth0();

  const [token, setToken] = useState("");
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        console.log(accessToken);
      } catch (error) {
        console.error("ERROR: ", error);
        logout();
      }
    };
    getAccessToken();
  });

  useEffect(() => {
    const getIdToken = async () => {
      try {
        const IDToken = await getIdTokenClaims();
        if (IDToken && IDToken.__raw && IDToken.exp) {
          setIdToken(IDToken.__raw);
          console.log(IDToken);
          console.log(Date.now() / 1000 > IDToken.exp ? "Expired" : "Valid");
        }
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };
    getIdToken();
  });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  useEffect(() => {
    const checkToken = async () => {
      try {
        await getAccessTokenSilently();
      } catch (e: any) {
        console.error("Token refresh failed:", e.error);
        if (
          e.error === "login_required" ||
          e.error === "consent_required" ||
          e.error === "invalid_grant"
        ) {
          logout();
        }
      }
      checkToken();
    };
  });

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
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Welcome to Todo App, {user?.nickname}
      </h1>
      <div className="logout">
        <Button title="Logout" handleClick={logout} />
      </div>
      <TaskInput setTasks={setTasks} />
      <SearchBar setTasks={setTasks} setIsLoading={setIsDataLoading} />
      <TaskTable tasks={tasks} isLoading={isDataLoading} setTasks={setTasks} />
    </>
  );
}
