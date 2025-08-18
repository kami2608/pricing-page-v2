import type { Task } from "../types/task.types";
import { getCurrentTimeString } from "./formatDate";

export function convertTaskList(tasks: Task[]): Task[] {
  return tasks.map((task) => ({
    ...task,
    createdAt: getCurrentTimeString(),
    updatedAt: getCurrentTimeString(),
  }));
}
