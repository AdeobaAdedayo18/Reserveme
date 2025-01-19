
import Cookies from 'js-cookie';
import { axiosInstance } from './axiosInstance';
const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
}

export const getSession = async () => {
    let access_token = Cookies.get('access_token');
    const refresh_token = Cookies.get('refresh_token');
    const username = Cookies.get('username');
    console.log(username);
    
    const user_id = Cookies.get('user_id');
    console.log(user_id);
    

    if (!access_token || isTokenExpired(access_token)) {
        if (!refresh_token) {
            return null;
        }
        access_token = await refreshAccessToken(refresh_token);
        if (!access_token) {
            console.error("Failed to refresh access token. Redirecting to sign-in.");
            return null;
        }
    }

    return { access_token, username, user_id };
};



export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response = await axiosInstance.post("/auth/refresh", { refresh: refreshToken });

        if (response.detail) {
            console.error("Failed to refresh token");
            return null;
        }

        const { access_token } = await response.access_token;
        return access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};