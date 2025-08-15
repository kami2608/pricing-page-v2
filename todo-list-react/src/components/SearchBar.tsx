import { useState, type Dispatch, type SetStateAction } from "react";
import StatusDropDown from "./StatusDropDown";
import { filterTasksInMockAPI } from "../services/filterTasks.api";
import type { Task } from "../types/task.types";
import Button from "./Button";
import { Status } from "../types/status.enum";
import { statusObject } from "../constants/statusObject.constant";

export default function SearchBar({
  setTasks,
  setIsLoading,
}: {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(statusObject[Status.TODO]);

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
