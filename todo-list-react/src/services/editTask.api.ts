import type { Task } from "../types/task.types";
import { axiosInstance } from "../constants/axios.constant";

export async function editTaskInMockAPI(id: string, task: Partial<Task>) {
  try {
    const response = await axiosInstance.put(`tasks/${id}`, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
