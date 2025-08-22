import { convertTaskList } from "../utils/formatTaskList";
import { axiosInstance } from "../constants/axios.constant";

export async function getTaskListFromMockAPI(signal?: AbortSignal) {
  try {
    const response = await axiosInstance.get(`tasks`, {
      signal,
    });
    return convertTaskList(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
