import axios from "axios";
import { getSession } from "./session";
import { getRefreshToken, logoutUser } from "./auth";
import Cookies from "js-cookie";

const COOKIE_OPTIONS = {
   path: "/",
   sameSite: "Strict",
   secure: process.env.NODE_ENV === "production",
};

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
    },
});

// Flag to track if we're currently refreshing the token
let isRefreshing = false;
// Store of callbacks to be called after token refresh
let refreshSubscribers: ((token: string) => void)[] = [];

// Subscribe to token refresh
const subscribeTokenRefresh = (cb: (token: string) => void) => {
   refreshSubscribers.push(cb);
};

// Notify all subscribers about new token
const onTokenRefreshed = (token: string) => {
   refreshSubscribers.forEach((cb) => cb(token));
   refreshSubscribers = [];
};

// Add a request interceptor to handle authentication
axiosInstance.interceptors.request.use(async (req) => {
   const session = await getSession();
   if (!session) {
      return req;
   }
   const { access_token, refresh_token } = session;

   // If either token is missing, proceed with the request as is
   if (!access_token || !refresh_token) {
      return req;
   }

   // Check if the access token is expired
   if (isTokenExpired(access_token)) {
      if (!isRefreshing) {
         isRefreshing = true;
         try {
            // Attempt to refresh the token
            const response = await getRefreshToken(refresh_token);
            // Update the auth user with new tokens
            Cookies.set("access_token", response.access_token, COOKIE_OPTIONS);

            // Notify all subscribers about the new token
            onTokenRefreshed(response.access_token);
            // Set the new access token in the request headers
            req.headers.Authorization = `Bearer ${response.access_token}`;
         } catch (error) {
            // Handle refresh token failure
            console.error("Token refresh failed:", error);
            // Clear all subscribers
            refreshSubscribers = [];
            // Logout user
            logoutUser();
         } finally {
            isRefreshing = false;
         }
      } else {
         // Wait for token refresh
         try {
            const token = await new Promise<string>((resolve) => {
               subscribeTokenRefresh(resolve);
            });
            req.headers.Authorization = `Bearer ${token}`;
         } catch (err) {
            console.error("Error waiting for token refresh:", err);
         }
      }
   } else {
      // If the access token is still valid, use it in the request headers
      req.headers.Authorization = `Bearer ${access_token}`;
   }

   // Return the modified request
   return req;
});

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      // If we get a 401 response and we haven't retried yet
      if (error.response?.status === 401 && originalRequest && !originalRequest.headers._retry) {
         originalRequest.headers._retry = true;
         const session = await getSession();
         if (!session) {
            logoutUser();
            return Promise.reject(error);
         }
         const { refresh_token } = session;

         if (refresh_token) {
            try {
               const response = await getRefreshToken(refresh_token);
               Cookies.set("access_token", response.access_token, COOKIE_OPTIONS);

               originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
               return axiosInstance(originalRequest);
            } catch (refreshError) {
               console.error("Token refresh failed:", refreshError);
               logoutUser();
            }
         } else {
            logoutUser();
         }
      }

      return Promise.reject(error);
   }
);

// Export the configured axios instance
export default axiosInstance;
