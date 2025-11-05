// app/config.ts

// ✅ Haddii aad rabto backend-ka Render (online) marka aad test gareynayso local Expo:
const BASE_URL = 'https://sagal-app.onrender.com/api';

export const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    HEALTH: '/health',
    STATUS: '/status',
    AUTH_LOGIN: '/auth/login',
    ORDERS: '/orders'
  }
} as const;

// Helper function to build full API URLs
export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
};

// Default export
export default API_CONFIG;
