// app/useOrders.ts
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://sagal-app.onrender.com/api/orders';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);

  const createOrder = async (orderData: any) => {
    setLoading(true);
    try {
      console.log('🚀 Creating order with data:', orderData);
      console.log('🎯 Sending to:', API_URL);
      
      const response = await axios.post(API_URL, orderData, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('✅ Order created successfully:', response.data);
      return response.data;
      
    } catch (error: any) {
      console.error('❌ Order creation failed:', error);
      
      // Handle Axios error specifically
      if (error.response) {
        // Server responded with error status
        const serverError = error.response.data;
        console.error('❌ Server error details:', serverError);
        throw new Error(serverError.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Failed to create order');
      }
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      const response = await axios.get('https://sagal-app.onrender.com/api/health', {
        timeout: 10000
      });
      return response.status === 200;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  };

  return { createOrder, loading, testConnection };
};