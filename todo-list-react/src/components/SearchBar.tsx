import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import StatusDropDown from "./StatusDropDown";
import { filterTasksInMockAPI } from "../services/filterTasks.api";
import type { Task } from "../types/task.types";
import Button from "./Button";
import { Status } from "../types/status.enum";
import { statusObject } from "../constants/statusObject.constant";
import { debounce } from "../types/debounce";
import { getTaskListFromMockAPI } from "../services/getTasks.api";

type Props = {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function SearchBar({ setTasks, setIsLoading }: Props) {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const debounceFilter = debounce(() => {
    const fetchTasks = async () => {
      const taskList = await getTaskListFromMockAPI();
      if (taskList) {
        const filteredTasks = taskList.filter(
          (task) =>
            task.title.includes(titleFilter) &&
            (statusFilter !== "" ? task.status === statusFilter : true),
        );
        setTasks(filteredTasks);
      }
    };
    fetchTasks();
  }, 500);

  useEffect(() => {
    debounceFilter();
  }, [titleFilter, statusFilter]);

  function handleFilter() {
    const filter = async () => {
      setIsLoading(true);
      const response = await filterTasksInMockAPI(statusFilter, titleFilter);
      if (response) {
        setTasks(response);
        setIsLoading(false);
      }
    };
    filter();
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
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </label>
        <label>
          <StatusDropDown
            defaulValue={statusFilter}
            handleChange={(e) => setStatusFilter(e)}
          />
        </label>
        <Button title="Filter" handleClick={handleFilter} />
      </section>
    </>
  );
}
