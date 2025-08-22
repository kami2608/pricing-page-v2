import { type Dispatch, type SetStateAction } from "react";
import Button from "./Button";
import { createdTask } from "../utils/createNewTask";
import { saveTaskInMockAPI } from "../services/postTask.api";
import type { Task } from "../types/task.types";
import { useForm } from "react-hook-form";
import { fieldRules } from "../utils/fieldRules";

export default function TaskInput({
  setTasks,
}: {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) {
  const { register, handleSubmit, watch, reset, formState: {errors} } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  function onSubmit() {
    const newTask = createdTask(watch("title"), watch("description"));
    const saveTask = async () => {
      const response = await saveTaskInMockAPI(newTask);
      if (response) {
        reset();
        alert("Task added successfully!");
        setTasks((prevTasks) => [response, ...prevTasks]);
      } else {
        alert("Failed to add task. Please try again.");
      }
    };
    saveTask();
  }

  return (
    <>
      <div className="add-task">
        <h2>Add Task</h2>
        <form id="add-form" onSubmit={handleSubmit(onSubmit)}>
          <label>Title: </label>
          <br />
          <input
            id="title"
            {...register("title", {
              required: true,
              minLength: {
                value: 3,
                message: "Title must be at least 3 chars",
              },
              validate: fieldRules,
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
            id="description"
            {...register("description", {
              required: true,
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
          <Button title="Add" handleClick={handleSubmit(onSubmit)}/>
          <br />
        </form>
      </div>
    </>
  );
}
