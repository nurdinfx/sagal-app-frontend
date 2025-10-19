import { useState, useCallback } from 'react';
import axios from 'axios';

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  image: string;
}

// Use your IP address
const API_BASE_URL = 'http://10.238.151.107:5000/api';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (orderData: {
    customerName: string;
    phoneNumber: string;
    address: string;
    items: OrderItem[];
    totalAmount: number;
    paymentMethod: 'cash_on_delivery' | 'online';
    location?: any;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Sending order to:', `${API_BASE_URL}/orders`);
      
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('✅ Order successful:', response.data);
      return response.data;
      
    } catch (err: any) {
      console.error('❌ Order failed:', err);
      
      let errorMessage = 'Failed to create order';
      
      if (err.code === 'ECONNREFUSED') {
        errorMessage = `Cannot connect to server at ${API_BASE_URL}. Make sure backend is running.`;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createOrder
  };
};