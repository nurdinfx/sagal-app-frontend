// app/useOrders.ts
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://sagal-app.onrender.com/api/orders';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);

  const createOrder = async (orderData: any) => {
    setLoading(true);
    try {
      console.log('🚀 Creating order with data:', JSON.stringify(orderData, null, 2));
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
      
      // Enhanced error logging
      if (error.response) {
        console.error('❌ Server response error:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        const serverError = error.response.data;
        throw new Error(serverError.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        console.error('❌ No response received:', error.request);
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        console.error('❌ Request setup error:', error.message);
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