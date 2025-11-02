// app/config.ts

// Base URL: use environment variable if defined, otherwise fallback to localhost for dev
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';

export const API_CONFIG = {
  BASE_URL: 'https://sagal-app.onrender.com/api',
  ENDPOINTS: {
    HEALTH: '/health',
    STATUS: '/status',
    AUTH_LOGIN: '/auth/login',
    ORDERS: '/orders'
  }
} as const;

// Example helper function to build full URL
export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
};

// ✅ Default export
export default API_CONFIG;
