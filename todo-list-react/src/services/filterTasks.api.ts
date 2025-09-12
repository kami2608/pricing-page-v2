import { axiosInstance } from "../constants/axios.constant";

export async function filterTasksInMockAPI(status: string, title: string) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (title) params.append("title", title);
  try {
    const response = await axiosInstance.get(`tasks`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}