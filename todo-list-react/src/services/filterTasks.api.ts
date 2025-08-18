import axios from "axios";
import { APIUrl } from "../constants/mockAPI.constant";

export async function filterTasksInMockAPI(status: string, title: string) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (title) params.append("title", title);
  try {
    const response = await axios.get(`${APIUrl}`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
