import axios from "axios";
import { getSession, refreshAccessToken } from "./session";
import Cookies from "js-cookie";
import { logoutUser } from "./auth";
export const baseURL= "https://reserveme.up.railway.app"

// Axios instance setup
const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    
});

// Token refresh queue
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

// Request interceptor for adding Authorization header
axiosInstance.interceptors.request.use(async (req) => {
    const session = await getSession();

    if (session?.access_token) {
        req.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return req;
});

// Response interceptor to handle token expiration and 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Custom flag to prevent infinite retries

            const session = await getSession();
            if (session?.access_token) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    try {

                        const newAccessToken = await refreshAccessToken();
                        if (newAccessToken) {
                            
                            Cookies.set("access_token", newAccessToken);
                            onTokenRefreshed(newAccessToken);
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axiosInstance(originalRequest);
                        }
                    } finally {
                        isRefreshing = false;
                    }
                } else {
                    return new Promise((resolve) => {
                        subscribeTokenRefresh((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(axiosInstance(originalRequest));
                        });
                    });
                }
            }
            logoutUser();
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
