import { type Dispatch, type SetStateAction } from "react";
import type { Task } from "../types/task.types";
import EmptyRow from "./EmptyRow";
import LoadingRow from "./LoadingRow";
import TaskRow from "./TaskRow";

type Props = {
  tasks: Task[];
  isLoading?: boolean;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function TaskTable({ tasks, isLoading, setTasks }: Props) {
  return (
    <>
      <table className="todo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <LoadingRow />
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskRow key={task.id} task={task} setTasks={setTasks} />
            ))
          ) : (
            <EmptyRow />
          )}
        </tbody>
      </table>
    </>
  );
}
