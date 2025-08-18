import { convertTaskList } from "../utils/formatTaskList";
import { instance } from "../constants/axios.constant";

export async function getTaskListFromMockAPI(signal?: AbortSignal) {
  try {
    const response = await instance.get(``, { signal });
    return convertTaskList(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
