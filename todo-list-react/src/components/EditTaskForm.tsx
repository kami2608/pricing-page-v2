import { useState, type Dispatch, type SetStateAction } from "react";
import Button from "./Button";
import StatusDropDown from "./StatusDropDown";
import type { Task } from "../types/task.types";
import { getCurrentTimeString } from "../utils/formatDate";
import { editTaskInMockAPI } from "../services/editTask.api";

type Props = {
  task: Task;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function EditTaskForm({ task, setIsEditing, setTasks }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  function handleSubmit() {
    const editTask = async () => {
      const editedTask: Partial<Task> = {
        title: title,
        description: description,
        status: status,
        updatedAt: getCurrentTimeString(),
      };
      const response = await editTaskInMockAPI(task.id, editedTask);
      if (response) {
        alert("Task updated successfully!");
        setTasks((prevTasks) => {
          return prevTasks.map((t) =>
            t.id === task.id ? { ...t, ...editedTask } : t,
          );
        });
        setIsEditing(false);
      } else {
        alert("Failed to update task. Please try again.");
      }
    };
    editTask();
    setIsEditing(false);
  }
  function handleCancel() {
    setIsEditing(false);
  }
  return (
    <>
      <section id="edit-task">
        <h3>Edit task</h3>
        <form action="#" id="edit-form">
          <label>ID:</label>
          <br />
          <input
            type="text"
            id="edit-id"
            value={task.id}
            readOnly
            style={{ color: "gray" }}
          />
          <br />
          <label>Title: </label>
          <br />
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Description: </label>
          <br />
          <input
            type="text"
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <label>
            <StatusDropDown
              defaulValue={status}
              handleChange={(e) => setStatus(e)}
            />
          </label>
          <br />
          <br />
          <Button title="Submit" handleClick={handleSubmit} />
          <Button title="Cancel" handleClick={handleCancel} />
        </form>
      </section>
    </>
  );
}
