import { FC, useState } from "react";
import { Task } from "../../types/task.types";
import Button from "../../components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskInMockAPI } from "../../services/deleteTask.api";
import EditTaskForm from "./EditTaskForm";
import { queryKeys } from "../../constants/queryKeys.constant";

interface TaskRowProps {
  task: Task;
}

const TaskRow: FC<TaskRowProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation<Task, Error, string>({
    mutationFn: deleteTaskInMockAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos });
    },
  });

  function handleEdit() {
    setIsEditing(true);
  }
  function handleDelete() {
    mutation.mutate(task.id, {
      onSuccess: (data) => {
        alert(`Task ${data.title} deleted successfully!`);
      },
      onError: (error) => {
        console.log(error);
        alert("Failed to delete task. Please try again.");
      },
    });
  }

  return (
    <>
      <tr>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.status}</td>
        <td>{task.createdAt}</td>
        <td>{task.updatedAt}</td>
        <td>
          <Button title="Edit" handleClick={handleEdit} />
        </td>
        <td>
          <Button title="Delete" handleClick={handleDelete} />
        </td>
      </tr>
      {isEditing && <EditTaskForm task={task} setIsEditing={setIsEditing} />}
    </>
  );
};

export default TaskRow;
