import axios from "axios";
import { APIUrl } from "../constants/mockAPI.constant";
import type { Task } from "../types/task.types";

export async function saveTaskInMockAPI(task: Task) {
  try {
    const response = await axios.post(`${APIUrl}`, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
