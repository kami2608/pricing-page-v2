import { instance } from "../constants/axios.constant";

export async function deleteTaskInMockAPI(id: string) {
  try {
    const response = await instance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
