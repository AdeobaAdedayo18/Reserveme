// import {redirect} from "next/navigation";

import { axiosInstance } from "./axios";
import { deleteCookie, setCookie } from "./cookies";
import Cookies from "js-cookie";

const COOKIE_OPTIONS = {
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
};

export const loginUser = async (formData: { password: string; email: string }) => {
    try {
        const response = await axiosInstance.post("/auth/user/login", formData);

        if (!response || !response.data) {
            throw new Error('Login failed');
        }

        const { access_token, refresh_token, username, user_id, role } = response.data;
        console.log(response);
        

        Cookies.set("access_token", access_token, COOKIE_OPTIONS);
        Cookies.set("refresh_token", refresh_token, COOKIE_OPTIONS);
        Cookies.set("username", username, { ...COOKIE_OPTIONS, httpOnly: false });
        Cookies.set("user_id",user_id, { ...COOKIE_OPTIONS, httpOnly: false });
        Cookies.set("role",role, { ...COOKIE_OPTIONS, httpOnly: false });

        return { success: true };
    } catch (error) {
        return { success: false, message: error };
    }
};

export const registerUser = async (formData: { email: string; username?: string; password: string }) => {
    try {
        const response = await axiosInstance.post("/auth/register", formData);

        if (!response || !response.data) {
            const error = await response.data;
            throw new Error(error.detail || 'Registration failed');
        }

        if (!response || !response.data) {
            throw new Error('Login failed');
        }

        const { message } = await response.data;
        return { success: true, message: message, redirect: "/sign-in" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};


export const getRefreshToken = async (refreshToken: string) => {
    try {
        const response = await axiosInstance.post("/auth/refresh-token", { refresh: refreshToken });

        if (!response || !response.data) {
            throw new Error('Failed to refresh token');
        }

        const { access_token } = await response.data;
        return access_token;
    } catch (error) {
        return null;
    }
}

export const logoutUser = async () => {
    await deleteCookie("access_token");
    await deleteCookie("refresh_token");
    await deleteCookie("user_data");
};