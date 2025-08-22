import { statusObject } from "../constants/statusObject.constant";
import { Status } from "../types/status.enum";
import type { Task } from "../types/task.types";
import { getCurrentTimeString } from "./formatDate";

export function createdTask(data: Partial<Task>): Task {
  return {
    id: new Date().getTime().toString(),
    title: data.title ?? "",
    description: data.description ?? "",
    status: statusObject[Status.TODO],
    createdAt: getCurrentTimeString(),
    updatedAt: getCurrentTimeString(),
  };
}
