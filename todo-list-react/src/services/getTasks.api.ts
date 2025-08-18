import axios from "axios";
import { APIUrl } from "../constants/mockAPI.constant";
import { convertTaskList } from "../utils/formatTaskList";

export async function getTaskListFromMockAPI(signal?: AbortSignal) {
  try {
    const response = await axios.get(`${APIUrl}`, { signal });
    return convertTaskList(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
