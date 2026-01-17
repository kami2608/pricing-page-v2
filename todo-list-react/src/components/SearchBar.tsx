import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import StatusDropDown from "./StatusDropDown";
import type { Task } from "../types/task.types";
import { debounce } from "../utils/debounce";
import { getTaskListFromMockAPI } from "../services/getTasks.api";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function SearchBar({ setTasks, setIsLoading }: Props) {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const controller = new AbortController();

  const debounceFilter = debounce(() => {
    const params = new URLSearchParams(window.location.search);
    setStatusFilter(params.get("status") ?? "");
    setTitleFilter(params.get("title") ?? "");
    const fetchTasks = async () => {
      const taskList = await getTaskListFromMockAPI(controller.signal);
      if (taskList) {
        const filteredTasks = taskList.filter(
          (task) =>
            task.title.includes(params.get("title") ?? "") &&
            task.status.includes(params.get("status") ?? ""),
        );
        setTasks(filteredTasks);
      }
    };
    fetchTasks();
  }, 500);

  useEffect(() => {
    console.log("effect");
    debounceFilter();
    return () => controller.abort();
  }, [location.search]);

  const updateTitleParams = useCallback(
    debounce((e: string) => {
      if (e) {
        const params = new URLSearchParams(window.location.search);
        params.set("title", e);
        navigate("?" + params.toString(), { replace: false });
      }
    }, 500),
    [],
  );

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitleFilter(e.target.value);
    updateTitleParams(e.target.value);
  }

  function handleChangeStatus(e: string) {
    setStatusFilter(e);
    const params = new URLSearchParams(window.location.search);
    params.set("status", e);
    navigate("?" + params.toString(), { replace: false });
  }

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Search and Filter</h2>
      <section className="search">
        <label>
          Title:{" "}
          <input
            type="text"
            id="title-filter"
            value={titleFilter}
            onChange={(e) => handleChangeTitle(e)}
          />
        </label>
        <label>
          <StatusDropDown
            defaulValue={statusFilter}
            handleChange={(e) => handleChangeStatus(e)}
          />
        </label>
      </section>
    </>
  );
}
