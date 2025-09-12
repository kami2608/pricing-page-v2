import { FC } from "react";
import RouteButtons from "../../components/RouteButtons";
import TaskInput from "./TaskInput";
import PaginatedTaskTable from "./PaginatedTaskTable";

const TodoListRTKQuery: FC = () => {
  return (
    <>
      <RouteButtons />
      <h1 style={{ textAlign: "center" }}>Todo list with paginated queries</h1>
      <TaskInput />
      <PaginatedTaskTable/>
    </>
  );
};

export default TodoListRTKQuery;
