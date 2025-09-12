import { convertTaskList } from "../utils/formatTaskList";
import { axiosInstance } from "../constants/axios.constant";
import { APIUrl, LIMIT } from "../constants/mockAPI.constant";

export async function getTaskListFromMockAPI(
  signal?: AbortSignal,
  page?: number,
) {
  const urlSearch = new URL(`${APIUrl}tasks`);
  if (page != undefined) {
    urlSearch.searchParams.append("page", page.toString());
    urlSearch.searchParams.append("limit", LIMIT.toString());
  }
  const url = page ? urlSearch.toString() : "tasks";
  try {
    const response = await axiosInstance.get(url, {
      signal,
      allowAbsoluteUrls: !!page,
    });
    console.log(response);
    await new Promise((resolve) =>
      setTimeout(() => {
        console.log("get todos done");
        resolve(true);
      }, 3000),
    );
    return convertTaskList(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
