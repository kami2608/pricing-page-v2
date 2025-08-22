import { getTaskListFromMockAPI } from "../services/getTasks.api";

export const fieldRules = {
  noSpecialChar: (value: string) =>
    /^[a-zA-Z0-9 _-]+$/.test(value) || "No special characters allowed",
  noExist: async (value: string) => {
    const tasks = await getTaskListFromMockAPI();
    if (tasks) {
      for (const task of tasks) {
        if (task.title === value) return "The title already exist";
      }
    }
    return true;
  },
};
