import type { Task } from "../types/task.types";
import { instance } from "../constants/axios.constant";

export async function saveTaskInMockAPI(task: Task) {
  try {
    const response = await instance.post(``, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
