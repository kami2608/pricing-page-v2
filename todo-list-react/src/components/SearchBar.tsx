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
import { useSearchParams } from "react-router-dom";

type Props = {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function SearchBar({ setTasks, setIsLoading }: Props) {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const controller = new AbortController();
  const debounceFilter = debounce(() => {
    setStatusFilter(searchParams.get("status") ?? "");
    setTitleFilter(searchParams.get("title") ?? "");
    setIsLoading(true);
    const fetchTasks = async () => {
      const taskList = await getTaskListFromMockAPI(controller.signal);
      if (taskList) {
        const filteredTasks = taskList.filter(
          (task) =>
            task.title.includes(searchParams.get("title") ?? "") &&
            task.status.includes(searchParams.get("status") ?? ""),
        );
        setTasks(filteredTasks);
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, 500);

  useEffect(() => {
    debounceFilter();
    return () => controller.abort();
  }, [searchParams]);

  const updateTitleParams = useCallback(
    debounce((e: string) => {
      setSearchParams({ title: e });
    }, 500),
    [],
  );

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitleFilter(e.target.value);
    updateTitleParams(e.target.value);
  }

  function handleChangeStatus(e: string) {
    setStatusFilter(e);
    setSearchParams({ status: e });
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
        {/* <Button title="Filter" handleClick={handleFilter} /> */}
      </section>
    </>
  );
}
