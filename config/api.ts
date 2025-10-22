// app/config.ts
export const API_CONFIG = {
  BASE_URL: 'https://sagal-app.onrender.com/api',
  ENDPOINTS: {
    ORDERS: '/orders',
    HEALTH: '/health',
    AUTH: '/auth/login'
  }
} as const;

// ✅ ADD DEFAULT EXPORT
export default { API_CONFIG };