import axios from "axios"
import { APIUrl } from "./mockAPI.constant"

export const instance = axios.create({
    baseURL: APIUrl,
    allowAbsoluteUrls: false,
})