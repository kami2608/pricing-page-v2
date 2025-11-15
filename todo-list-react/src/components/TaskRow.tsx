import { useState, type Dispatch, type SetStateAction } from "react";
import { deleteTaskInMockAPI } from "../services/deleteTask.api";
import type { Task } from "../types/task.types";
import Button from "./Button";
import EditTaskForm from "./EditTaskForm";

type Props = {
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function TaskRow({ task, setTasks }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  function handleEdit() {
    setIsEditing(true);
  }
  function handleDelete() {
    const deleteTask = async () => {
      const response = await deleteTaskInMockAPI(task.id);
      if (response) {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        alert("Task deleted successfully!");
      } else {
        alert("Failed to delete task. Please try again.");
      }
    };
    deleteTask();
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
      {isEditing && (
        <EditTaskForm
          task={task}
          setIsEditing={setIsEditing}
          setTasks={setTasks}
        />
      )}
    </>
  );
}
