import { type Dispatch, type SetStateAction } from "react";
import Button from "./Button";
import { createdTask } from "../utils/createNewTask";
import { saveTaskInMockAPI } from "../services/postTask.api";
import type { Task } from "../types/task.types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { fieldRules } from "../utils/fieldRules";
import DisplayError from "./DisplayError";

export default function TaskInput({
  setTasks,
}: {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Partial<Task>> = async (data) => {
    const newTask = createdTask(data);
    const response = await saveTaskInMockAPI(newTask);
      if (response) {
        reset();
        alert("Task added successfully!");
        setTasks((prevTasks) => [response, ...prevTasks]);
      } else {
        alert("Failed to add task. Please try again.");
      }
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
          <DisplayError error={errors.title}/>
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
          <DisplayError error={errors.description}/>
          <br />
          <Button title="Add"/>
          <br />
        </form>
      </div>
    </>
  );
}
