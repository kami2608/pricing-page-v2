import { instance } from "../constants/axios.constant";

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error: ", error);
    return Promise.reject(error);
  },
);
