import { APIUrl } from "../constants/mockAPI.constant";
import type { Task } from "../types/task.types";

export async function saveTaskInMockAPI(task: Task) {
  try {
    const response = await fetch(APIUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}
