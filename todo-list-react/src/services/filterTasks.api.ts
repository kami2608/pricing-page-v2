import { APIUrl } from "../constants/mockAPI.constant";

export async function filterTasksInMockAPI(status: string, title: string) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (title) params.append("title", title);
  try {
    const response = await fetch(`${APIUrl}?${params.toString()}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
