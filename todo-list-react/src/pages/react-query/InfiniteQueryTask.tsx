import { FC } from "react";
import LoadingRow from "../../components/LoadingRow";
import TaskRow from "./TaskRow";
import EmptyRow from "../../components/EmptyRow";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTaskListFromMockAPI } from "../../services/getTasks.api";
import { queryKeys } from "../../constants/queryKeys.constant";

const InfiniteQueryTask: FC = () => {
  const {
    status,
    data,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: queryKeys.todos,
    queryFn: ({ pageParam, signal }) =>
      getTaskListFromMockAPI(signal, pageParam),
    initialPageParam: 5,
    getPreviousPageParam: (_, __, firstPageParams) =>
      firstPageParams > 1 ? firstPageParams - 1 : undefined,
    getNextPageParam: (_, __, lastPageParam) =>
      lastPageParam < 8 ? lastPageParam + 1 : undefined,
    // select: (data) => ({
    //   pages: [...data.pages].reverse(),
    //   pageParams: [...data.pageParams].reverse(),
    // }),
    maxPages: 3,
  });

  return (
    <>
      <div>
        <button
          onClick={() => (!isFetching ? fetchPreviousPage() : null)}
          disabled={!hasPreviousPage || isFetchingPreviousPage}
        >
          {isFetchingPreviousPage
            ? "Loading more..."
            : hasPreviousPage
              ? "Load Older"
              : "Nothing more to load"}
        </button>
      </div>
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
          {status === "pending" ? (
            <LoadingRow />
          ) : data && data.pages.length > 0 ? (
            data?.pages.map((page) =>
              page?.map((task) => <TaskRow key={task.id} task={task} />),
            )
          ) : (
            <EmptyRow />
          )}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => (!isFetching ? fetchNextPage() : null)}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load Newer"
              : "Nothing more to load"}
        </button>
      </div>
    </>
  );
};

export default InfiniteQueryTask;
