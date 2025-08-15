import { statusObject } from "../constants/statusObject.constant";
import { Status } from "../types/status.enum";
import type { Task } from "../types/task.types";
import { getCurrentTimeString } from "./formatDate";

export function convertTaskList(tasks: Task[]): Task[] {
  return tasks.map((task) => ({
    ...task,
    status: statusObject[Status.TODO],
    createdAt: getCurrentTimeString(),
    updatedAt: getCurrentTimeString(),
  }));
}
