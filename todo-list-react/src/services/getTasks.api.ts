import { APIUrl } from "../constants/mockAPI.constant";
import { convertTaskList } from "../utils/formatTaskList";

export async function getTaskListFromMockAPI(signal: AbortSignal) {
  try {
    const response = await fetch(`${APIUrl}`, {signal});
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return convertTaskList(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
