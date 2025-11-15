import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import Button from "./Button";
import { createdTask } from "../utils/createNewTask";
import { saveTaskInMockAPI } from "../services/postTask.api";
import type { Task } from "../types/task.types";

export default function TaskInput({
  setTasks,
}: {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    const newTask = createdTask(title, description);
    const saveTask = async () => {
      const response = await saveTaskInMockAPI(newTask);
      if (response) {
        setTitle("");
        setDescription("");
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
        <form action="#" id="add-form" onSubmit={handleSubmit}>
          <label>Title: </label>
          <br />
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Description: </label>
          <br />
          <input
            type="text"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <Button title="Add" />
          <br />
        </form>
      </div>
    </>
  );
}
