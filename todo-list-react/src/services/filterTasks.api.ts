import { instance } from "../constants/axios.constant";

export async function filterTasksInMockAPI(status: string, title: string) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (title) params.append("title", title);
  try {
    const response = await instance.get(``, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
