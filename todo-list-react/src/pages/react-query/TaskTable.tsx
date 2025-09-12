import { FC } from "react";
import LoadingRow from "../../components/LoadingRow";
import TaskRow from "./TaskRow";
import EmptyRow from "../../components/EmptyRow";
import { useQuery } from "@tanstack/react-query";
import { getTaskListFromMockAPI } from "../../services/getTasks.api";
import { queryKeys } from "../../constants/queryKeys.constant";
import { getUsers } from "../../services/getUsers.api";

const TaskTable: FC = () => {
  const { status, data, isSuccess, fetchStatus } = useQuery({
    queryKey: queryKeys.todos,
    queryFn: ({ signal }) => getTaskListFromMockAPI(signal, 20),
    // refetchOnReconnect: false,
    // refetchOnWindowFocus: false,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
  });

  // console.log("Todos: ", data);
  // console.log("Status (todos): ", status);
  // console.log("Fetch status (todos): ", fetchStatus);

  const {
    data: userData,
    status: userStatus,
    fetchStatus: userFetchStatus,
  } = useQuery({
    queryKey: queryKeys.users,
    queryFn: ({ signal }) => getUsers(signal),
    enabled: !!data,
  });

  // console.log("Users: ", userData);
  // console.log("Status (users): ", userStatus);
  // console.log("Fetch status (users): ", userFetchStatus);

  return (
    <>
      {!userData && <p>{userFetchStatus}</p>}
      {userData &&
        userData.map((user, index) => (
          <p key={index}>{`${user.id}: ${user.username}`}</p>
        ))}
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

export default TaskTable;
