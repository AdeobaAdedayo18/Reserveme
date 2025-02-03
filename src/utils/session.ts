import axios from 'axios';
import Cookies from 'js-cookie';

// Helper to check if a token is expired
export const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        return Date.now() >= payload.exp * 1000; // Compare current time with expiry
    } catch {
        return true; // Treat invalid tokens as expired
    }
};

// Retrieve session details
export const getSession = async () => {
    const access_token = Cookies.get("access_token")
    const refresh_token = Cookies.get("refresh_token")
    const user_id = Cookies.get("user_id")
    const role = Cookies.get("role");

    // Check token validity
    if (!access_token || isTokenExpired(String(access_token))) {
        if (refresh_token && !isTokenExpired(String(refresh_token))) {
            const newAccessToken = await refreshAccessToken(String(refresh_token));
            if (newAccessToken) {
               
                
                Cookies.set("access_token", newAccessToken, COOKIE_OPTIONS);
                return { access_token: newAccessToken,  refresh_token: String(refresh_token), 
                    user_id: String(user_id), 
                    role: String(role)  };
            }
        }
        return null;
    }

    return { 
        access_token: String(access_token), 
        refresh_token: String(refresh_token), 
        user_id: String(user_id), 
        role: String(role) 
    };
};

interface response {
    access_token: string;
    refresh_token: string;
}

// Refresh the access token using the refresh token
export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response:response = await axios.post(
            "http://127.0.0.1:8000/auth/refresh-token",
            { refresh_token: refreshToken }
        );
        
        
        return response.access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

const COOKIE_OPTIONS = {
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
};
