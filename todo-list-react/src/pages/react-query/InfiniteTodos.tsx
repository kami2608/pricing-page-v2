import { FC } from "react";
import RouteButtons from "../../components/RouteButtons";
import TaskInput from "./TaskInput";
import InfiniteQueryTask from "./InfiniteQueryTask";

const TodoListRTKQuery: FC = () => {
  return (
    <>
      <RouteButtons />
      <h1 style={{ textAlign: "center" }}>Todo list with infinite queries</h1>
      <TaskInput />
      <InfiniteQueryTask />
    </>
  );
};

export default TodoListRTKQuery;
