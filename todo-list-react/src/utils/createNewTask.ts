import { statusObject } from "../constants/statusObject.constant";
import { Status } from "../types/status.enum";
import type { Task } from "../types/task.types";
import { getCurrentTimeString } from "./formatDate";

export function createdTask(title: string, description: string): Task {
  return {
    id: new Date().getTime().toString(),
    title,
    description,
    status: statusObject[Status.TODO],
    createdAt: getCurrentTimeString(),
    updatedAt: getCurrentTimeString(),
  };
}
