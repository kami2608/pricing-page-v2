import { APIUrl } from "../constants/mockAPI.constant";

export async function deleteTaskInMockAPI(id: string) {
  try {
    const response = await fetch(`${APIUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.log("Error: ", error);
    throw error; // Re-throw the error for further handling if needed
  }
}
