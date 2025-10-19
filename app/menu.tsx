import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './useCart';
import { Products } from './products';
import { useOrders } from './useOrders';
import axios from 'axios';

// Use your IP address
const BACKEND_URL = 'http://10.238.151.107:5000';

export default function MenuScreen() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalAmount, getTotalItems } = useCart();
  const { createOrder, loading } = useOrders();
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [backendConnected, setBackendConnected] = useState(false);

  const categories = ['all', 'gas', 'cooker', 'pipes'];

  const filteredProducts = activeCategory === 'all' 
    ? Products 
    : Products.filter(product => product.category === activeCategory);

  // Test backend connection on component mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      console.log('🔗 Testing connection to:', BACKEND_URL);
      const response = await axios.get(`${BACKEND_URL}/api/health`, {
        timeout: 5000
      });
      setBackendConnected(true);
      console.log('✅ Backend connected successfully');
    } catch (error: any) {
      setBackendConnected(false);
      console.error('❌ Backend connection failed:', error.message);
    }
  };

  const placeOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      Alert.alert('Error', 'Please fill all customer information');
      return;
    }

    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    const orderData = {
      customerName: customerInfo.name,
      phoneNumber: customerInfo.phone,
      address: customerInfo.address,
      items: cart.map(item => ({
        product: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      totalAmount: getTotalAmount(),
      paymentMethod: 'cash_on_delivery',
    };

    console.log('📦 Sending order data:', orderData);

    try {
      const result = await createOrder(orderData);

      if (result.success) {
        Alert.alert(
          'Order Placed Successfully!', 
          `Order #${result.data.orderNumber} received. Total: $${result.data.totalAmount}. We will call you within 30-45 minutes for delivery.`,
          [
            { 
              text: 'OK', 
              onPress: () => {
                clearCart();
                setCustomerInfo({ name: '', phone: '', address: '' });
                router.push('/');
              }
            }
          ]
        );
      }
    } catch (error: any) {
      console.error('Order error:', error);
      Alert.alert(
        'Order Failed', 
        error.message || 'Failed to place order. Please try again.',
        [
          {
            text: 'Test Connection',
            onPress: testBackendConnection
          },
          {
            text: 'OK'
          }
        ]
      );
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-16 pb-4 px-6 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-xl font-bold">Our Products</Text>
            <View className="flex-row items-center mt-1">
              <View className={`w-2 h-2 rounded-full mr-2 ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <Text className={`text-xs ${backendConnected ? 'text-green-600' : 'text-red-600'}`}>
                {backendConnected ? 'Backend Connected' : 'Backend Offline'}
              </Text>
            </View>
          </View>
          <View className="w-8" />
        </View>

        {/* Connection Test Button */}
        <TouchableOpacity 
          onPress={testBackendConnection}
          className={`flex-row items-center justify-center py-2 rounded-lg mb-4 ${backendConnected ? 'bg-green-100' : 'bg-red-100'}`}
        >
          <Ionicons 
            name={backendConnected ? 'checkmark-circle' : 'warning'} 
            size={16} 
            color={backendConnected ? 'green' : 'red'} 
          />
          <Text className={`ml-2 ${backendConnected ? 'text-green-800' : 'text-red-800'}`}>
            {backendConnected ? 'Server Connected' : 'Check Server Connection'}
          </Text>
        </TouchableOpacity>

        {/* Debug Connection Button */}
        <TouchableOpacity 
          onPress={async () => {
            try {
              const response = await axios.get(`${BACKEND_URL}/api/health`);
              Alert.alert('✅ Backend Connected', `Server: ${BACKEND_URL}\nStatus: ${response.data.status}`);
            } catch (error: any) {
              Alert.alert('❌ Connection Failed', `Cannot reach: ${BACKEND_URL}\nError: ${error.message}`);
            }
          }}
          className="bg-blue-500 rounded-xl py-3 mb-4"
        >
          <Text className="text-white text-center font-semibold">Test Backend Connection</Text>
        </TouchableOpacity>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              className={`mr-3 px-4 py-2 rounded-full ${
                activeCategory === category ? 'bg-[#FF6B35]' : 'bg-gray-200'
              }`}
            >
              <Text className={activeCategory === category ? 'text-white font-semibold' : 'text-gray-700'}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Products Grid */}
        <View className="flex-row flex-wrap justify-between pt-4">
          {filteredProducts.map(product => (
            <View key={product.id} className="w-[48%] bg-white rounded-2xl p-4 mb-4 shadow-sm">
              <View className="items-center mb-3">
                <View className="bg-gray-100 rounded-xl p-2 mb-2 w-20 h-20 items-center justify-center">
                  <Image 
                    source={product.image}
                    className="w-16 h-16 rounded-lg"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-lg font-semibold text-center mb-1">{product.name}</Text>
                <Text className="text-[#FF6B35] text-xl font-bold">${product.price}</Text>
                {product.description && (
                  <Text className="text-gray-500 text-xs text-center mt-1">{product.description}</Text>
                )}
              </View>
              <TouchableOpacity 
                onPress={() => addToCart(product)}
                className="bg-[#FF6B35] rounded-xl py-3"
              >
                <Text className="text-white text-center font-semibold">Hada Dalbo</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Rest of your menu.tsx remains the same */}
        {/* Cart Section */}
        {cart.length > 0 && (
          <View className="bg-white rounded-2xl p-6 mt-4 mb-6 shadow-sm">
            <Text className="text-xl font-bold mb-4">Your Order ({getTotalItems()} items)</Text>
            
            {cart.map(item => (
              <View key={item.id} className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="font-semibold">{item.name}</Text>
                  <Text className="text-[#FF6B35] font-bold">${item.price} x {item.quantity}</Text>
                </View>
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
                  >
                    <Ionicons name="remove" size={16} color="#000" />
                  </TouchableOpacity>
                  <Text className="mx-3 font-semibold">{item.quantity}</Text>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
                  >
                    <Ionicons name="add" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View className="border-t border-gray-200 pt-4 mt-4">
              <View className="flex-row justify-between mb-2">
                <Text className="font-semibold">Total:</Text>
                <Text className="text-[#FF6B35] font-bold text-lg">${getTotalAmount()}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Customer Information */}
        {cart.length > 0 && (
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <Text className="text-xl font-bold mb-4">Delivery Information</Text>
            
            <TextInput
              placeholder="Full Name"
              value={customerInfo.name}
              onChangeText={(text) => setCustomerInfo(prev => ({ ...prev, name: text }))}
              className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
            />
            
            <TextInput
              placeholder="Phone Number"
              value={customerInfo.phone}
              onChangeText={(text) => setCustomerInfo(prev => ({ ...prev, phone: text }))}
              keyboardType="phone-pad"
              className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
            />
            
            <TextInput
              placeholder="Delivery Address"
              value={customerInfo.address}
              onChangeText={(text) => setCustomerInfo(prev => ({ ...prev, address: text }))}
              multiline
              numberOfLines={3}
              className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
            />

            <TouchableOpacity 
              onPress={placeOrder}
              disabled={loading || !backendConnected}
              className={`rounded-xl py-4 ${loading || !backendConnected ? 'bg-gray-400' : 'bg-[#FF6B35]'}`}
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? 'Placing Order...' : 
                 !backendConnected ? 'Backend Offline' : 
                 `Place Order - $${getTotalAmount()}`}
              </Text>
            </TouchableOpacity>

            {!backendConnected && (
              <Text className="text-red-500 text-center mt-2 text-sm">
                Cannot connect to server. Make sure backend is running on http://10.238.151.107:5000
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 px-6 py-4">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="items-center flex-1" onPress={() => router.push('/')}>
            <Ionicons name="home" size={24} color="#6B7280" />
            <Text className="text-gray-500 text-sm mt-1">Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center flex-1">
            <Ionicons name="menu" size={24} color="#FF6B35" />
            <Text className="text-[#FF6B35] text-sm font-bold mt-1">Menu</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center flex-1" onPress={() => router.push('/orders')}>
            <Ionicons name="time" size={24} color="#6B7280" />
            <Text className="text-gray-500 text-sm mt-1">Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}