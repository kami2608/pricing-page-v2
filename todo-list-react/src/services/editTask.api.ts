import { APIUrl } from "../constants/mockAPI.constant";
import type { Task } from "../types/task.types";

export async function editTaskInMockAPI(id: string, task: Partial<Task>) {
  try {
    const response = await fetch(`${APIUrl}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
}
