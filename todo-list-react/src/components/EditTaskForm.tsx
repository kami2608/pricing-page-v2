import {  type Dispatch, type SetStateAction } from "react";
import Button from "./Button";
import type { Task } from "../types/task.types";
import { getCurrentTimeString } from "../utils/formatDate";
import { editTaskInMockAPI } from "../services/editTask.api";
import { useForm } from "react-hook-form";
import { statusObject } from "../constants/statusObject.constant";
import type { Status } from "../types/status.enum";

type Props = {
  task: Task;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function EditTaskForm({ task, setIsEditing, setTasks }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
    mode: "onChange",
  });

  function onSubmit() {
    const editTask = async () => {
      const editedTask: Partial<Task> = {
        title: watch("title"),
        description: watch("description"),
        status: watch("status"),
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
        <form onSubmit={handleSubmit(onSubmit)} id="edit-form">
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
            id="edit-title"
            {...register("title", {
              minLength: {
                value: 3,
                message: "Title must be at least 3 chars",
              },
            })}
          />
          <br />
          {errors.title && (
            <>
              <p style={{ color: "red" }}>{errors.title.message}</p>
              <br />
            </>
          )}
          <label>Description: </label>
          <br />
          <input
            id="edit-description"
            {...register("description", {
              minLength: {
                value: 5,
                message: "Description must be at least 5 chars",
              },
            })}
          />
          <br />
          {errors.description && (
            <>
              <p style={{ color: "red" }}>{errors.description.message}</p>
              <br />
            </>
          )}
          <br />
          <label>
            Status:
            <select id="status" {...register("status")}>
              {Object.keys(statusObject).map((key) => {
                const status = statusObject[key as Status];
                return status ? (
                  <option key={key} value={status}>
                    {status}
                  </option>
                ) : null;
              })}
            </select>
          </label>
          <br />
          <br />
          <Button title="Submit" handleClick={handleSubmit(onSubmit)} />
          <Button title="Cancel" handleClick={handleCancel} />
        </form>
      </section>
    </>
  );
}
