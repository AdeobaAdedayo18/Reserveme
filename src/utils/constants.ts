const isProduction = process.env.NODE_ENV === 'production';

export const baseURL = isProduction 
    ? "https://reserveme.up.railway.app" 
    : "http://127.0.0.1:8000";