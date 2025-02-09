import Cookies from "js-cookie";
import { axiosInstance } from "./axios";

const COOKIE_OPTIONS = {
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
};

export const loginUser = async (formData: { password: string; email: string }) => {


    // logoutUser()
    try {
        const response = await axiosInstance.post("/auth/user/login", formData);
        const { access_token, username, user_id, role } = response.data;

        // Store tokens and user details in cookies
        Cookies.set("access_token", access_token, COOKIE_OPTIONS);
        // Cookies.set("refresh_token", refresh_token, COOKIE_OPTIONS);
        Cookies.set("username", username, COOKIE_OPTIONS);
        Cookies.set("user_id", user_id, COOKIE_OPTIONS);
        Cookies.set("role", role, COOKIE_OPTIONS);
       

        return { success: true, role: role };
    } catch (error:any) {
        console.error("Login failed:", error);
        return { success: false, message: error.response?.data?.detail || "Login failed" };
    }
};

export const registerUser = async (formData: { email: string; username?: string; password: string }) => {
    try {
        const response = await axiosInstance.post("/auth/register", formData);
        return { success: true, message: response.data.message, redirect: "/sign-in" };
    } catch (error:any) {
        console.error("Registration failed:", error);
        return { success: false, message: error.response?.data?.detail || "Registration failed" };
    }
};

export const logoutUser = () => {
    Cookies.remove("access_token");
    // Cookies.remove("refresh_token");
    Cookies.remove("username");
    Cookies.remove("user_id");
    Cookies.remove("role");
};
