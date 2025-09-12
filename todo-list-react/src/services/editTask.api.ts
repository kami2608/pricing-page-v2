import type { Task } from "../types/task.types";
import { axiosInstance } from "../constants/axios.constant";

export interface EditTaskArgs {
  id: string;
  task: Partial<Task>;
}

export async function editTaskInMockAPI({ id, task }: EditTaskArgs) {
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
