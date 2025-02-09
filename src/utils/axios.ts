import axios from "axios";
const baseURL= "https://reserveme.up.railway.app"

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
    },
});