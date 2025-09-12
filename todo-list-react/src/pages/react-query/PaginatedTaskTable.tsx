import { FC, useState } from "react";
import LoadingRow from "../../components/LoadingRow";
import TaskRow from "./TaskRow";
import EmptyRow from "../../components/EmptyRow";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTaskListFromMockAPI } from "../../services/getTasks.api";
import { queryKeys } from "../../constants/queryKeys.constant";

const PaginatedTaskTable: FC = () => {
  const [page, setPage] = useState(1);

  const { status, data, isPlaceholderData } = useQuery({
    queryKey: queryKeys.todosPage(page),
    queryFn: ({ signal }) => getTaskListFromMockAPI(signal, page),
    // placeholderData: keepPreviousData,
  });


  return (
    <>
      <button
        disabled={page === 1}
        onClick={() => setPage((page) => Math.max(page - 1, 0))}
      >
        Previous
      </button>
      <span>{page}</span>
      <button
        disabled={isPlaceholderData}
        onClick={() => setPage((page) => page + 1)}
      >
        Next
      </button>
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
          {status === "pending"? (
            <LoadingRow />
          ) : data && data?.length > 0 ? (
            data?.map((task) => <TaskRow key={task.id} task={task} />)
          ) : (
            <EmptyRow />
          )}
        </tbody>
      </table>
    </>
  );
};

export default PaginatedTaskTable;
