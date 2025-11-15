import { axiosInstance } from "../constants/axios.constant";

export async function deleteTaskInMockAPI(id: string) {
  try {
    const response = await axiosInstance.delete(`tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
  }
}
