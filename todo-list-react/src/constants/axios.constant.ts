import axios from "axios"
import { APIUrl } from "./mockAPI.constant"

export const axiosInstance = axios.create({
    baseURL: APIUrl,
    allowAbsoluteUrls: false,
})