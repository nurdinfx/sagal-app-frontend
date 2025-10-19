import { useState, useCallback } from 'react';
import axios from 'axios';

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  image: string;
}

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
      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create order';
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