import axios from "axios";
import { APIUrl } from "../constants/mockAPI.constant";

export async function deleteTaskInMockAPI(id: string) {
  try {
    const response = await axios.delete(`${APIUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
