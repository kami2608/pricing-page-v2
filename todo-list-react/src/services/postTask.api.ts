import type { Task } from "../types/task.types";
import { axiosInstance } from "../constants/axios.constant";

export async function saveTaskInMockAPI(task: Task) {
  try {
    const response = await axiosInstance.post(`tasks`, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
