import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './useCart';
import { Products } from './products';
import { useOrders } from './useOrders';
import axios from 'axios';

// Use your backend URL
const BACKEND_URL = 'https://sagal-app.onrender.com';

export default function MenuScreen() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalAmount, getTotalItems } = useCart();
  const { createOrder, loading, testConnection } = useOrders();
  const [customerInfo, setCustomerInfo] = useState({ 
    name: '', 
    phone: '', 
    address: '' 
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [backendConnected, setBackendConnected] = useState(false);
  const [connectionTesting, setConnectionTesting] = useState(false);

  const categories = ['all', 'gas', 'cooker', 'pipes'];

  const filteredProducts = activeCategory === 'all' 
    ? Products 
    : Products.filter(product => product.category === activeCategory);

  // Test backend connection on component mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    setConnectionTesting(true);
    try {
      console.log('🔗 Testing connection to:', BACKEND_URL);
      const response = await axios.get(`${BACKEND_URL}/api/health`, {
        timeout: 10000 // 10 second timeout
      });
      setBackendConnected(true);
      console.log('✅ Backend connected successfully:', response.data);
      Alert.alert('✅ Connection Successful', 'Backend server is connected and ready!');
    } catch (error: any) {
      setBackendConnected(false);
      console.error('❌ Backend connection failed:', error.message);
      
      let errorMessage = 'Cannot connect to backend server. ';
      if (error.code === 'ECONNABORTED') {
        errorMessage += 'Request timeout. Server might be starting up.';
      } else if (error.response) {
        errorMessage += `Server responded with status: ${error.response.status}`;
      } else if (error.request) {
        errorMessage += 'No response received from server.';
      } else {
        errorMessage += error.message;
      }
      
      Alert.alert('❌ Connection Failed', errorMessage);
    } finally {
      setConnectionTesting(false);
    }
  };

  const validateOrder = () => {
    if (!customerInfo.name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }

    if (!customerInfo.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }

    // Basic phone validation
    const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }

    if (!customerInfo.address.trim()) {
      Alert.alert('Error', 'Please enter your delivery address');
      return false;
    }

    if (customerInfo.address.trim().length < 10) {
      Alert.alert('Error', 'Please provide a more detailed delivery address');
      return false;
    }

    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return false;
    }

    return true;
  };

  const placeOrder = async () => {
    // Validate inputs
    if (!validateOrder()) {
      return;
    }

    // Check backend connection
    if (!backendConnected) {
      Alert.alert(
        'Connection Issue', 
        'Cannot connect to server. Please check your internet connection and try again.',
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
      return;
    }

    // Prepare order data according to your backend schema
    const orderData = {
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      customer: {
        name: customerInfo.name.trim(),
        phone: customerInfo.phone.trim(),
        address: customerInfo.address.trim()
      },
      total: getTotalAmount(),
      deliveryAddress: customerInfo.address.trim(),
      paymentMethod: 'cash_on_delivery',
      status: 'pending',
      notes: 'Order placed from mobile app'
    };

    console.log('📦 Sending order data:', JSON.stringify(orderData, null, 2));

    try {
      console.log('🔄 Creating order...');
      const result = await createOrder(orderData);

      console.log('📨 Order response:', result);

      if (result.success) {
        Alert.alert(
          '🎉 Order Placed Successfully!', 
          `Thank you ${customerInfo.name}! Your order has been received.\n\nTotal: $${getTotalAmount()}\n\nWe will call you at ${customerInfo.phone} within 30-45 minutes to confirm delivery.`,
          [
            { 
              text: 'Continue Shopping', 
              onPress: () => {
                clearCart();
                setCustomerInfo({ name: '', phone: '', address: '' });
                router.push('/');
              }
            }
          ]
        );
      } else {
        throw new Error(result.message || 'Failed to create order');
      }
    } catch (error: any) {
      console.error('❌ Order error details:', error);
      
      let errorMessage = error.message || 'Failed to place order. Please try again.';
      
      // Provide more specific error messages
      if (errorMessage.includes('Network request failed')) {
        errorMessage = 'Network error: Please check your internet connection and try again.';
      } else if (errorMessage.includes('timeout')) {
        errorMessage = 'Server is taking too long to respond. Please try again in a moment.';
      } else if (errorMessage.includes('CORS')) {
        errorMessage = 'Server configuration error. Please contact support.';
      }

      Alert.alert(
        'Order Failed', 
        errorMessage,
        [
          {
            text: 'Test Connection',
            onPress: testBackendConnection
          },
          {
            text: 'Try Again',
            onPress: placeOrder
          },
          {
            text: 'OK'
          }
        ]
      );
    }
  };

  const getStatusColor = () => {
    if (connectionTesting) return 'blue';
    return backendConnected ? 'green' : 'red';
  };

  const getStatusText = () => {
    if (connectionTesting) return 'Testing Connection...';
    return backendConnected ? 'Backend Connected' : 'Backend Offline';
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
              <View className={`w-2 h-2 rounded-full mr-2 ${getStatusColor() === 'green' ? 'bg-green-500' : getStatusColor() === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} />
              <Text className={`text-xs ${getStatusColor() === 'green' ? 'text-green-600' : getStatusColor() === 'red' ? 'text-red-600' : 'text-blue-600'}`}>
                {getStatusText()}
              </Text>
            </View>
          </View>
          <View className="w-8" />
        </View>

        {/* Connection Status Card */}
        <View className={`p-3 rounded-lg mb-4 ${backendConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons 
                name={backendConnected ? 'checkmark-circle' : 'warning'} 
                size={20} 
                color={backendConnected ? 'green' : 'red'} 
              />
              <Text className={`ml-2 font-semibold ${backendConnected ? 'text-green-800' : 'text-red-800'}`}>
                Server Status
              </Text>
            </View>
            <TouchableOpacity 
              onPress={testBackendConnection}
              disabled={connectionTesting}
              className={`px-3 py-1 rounded-full ${connectionTesting ? 'bg-gray-300' : 'bg-blue-500'}`}
            >
              <Text className="text-white text-xs">
                {connectionTesting ? 'Testing...' : 'Test'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className={`text-sm mt-1 ${backendConnected ? 'text-green-600' : 'text-red-600'}`}>
            {BACKEND_URL}
          </Text>
        </View>

        {/* Debug Connection Button */}
        <TouchableOpacity 
          onPress={async () => {
            try {
              setConnectionTesting(true);
              const response = await axios.get(`${BACKEND_URL}/api/debug`, {
                timeout: 10000
              });
              Alert.alert(
                '✅ Backend Debug Info', 
                `Server: ${BACKEND_URL}\nStatus: ${response.data.message}\nEnvironment: ${response.data.environment.node_env}`
              );
            } catch (error: any) {
              Alert.alert(
                '❌ Debug Connection Failed', 
                `URL: ${BACKEND_URL}\nError: ${error.message}`
              );
            } finally {
              setConnectionTesting(false);
            }
          }}
          className="bg-blue-500 rounded-xl py-3 mb-4"
          disabled={connectionTesting}
        >
          <Text className="text-white text-center font-semibold">
            {connectionTesting ? 'Testing Debug Endpoint...' : 'Test Debug Endpoint'}
          </Text>
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
                <Text className="text-white text-center font-semibold">Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Cart Section */}
        {cart.length > 0 && (
          <View className="bg-white rounded-2xl p-6 mt-4 mb-6 shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">Your Order ({getTotalItems()} items)</Text>
              <TouchableOpacity onPress={clearCart} className="bg-red-50 px-3 py-1 rounded-full">
                <Text className="text-red-600 text-sm font-semibold">Clear All</Text>
              </TouchableOpacity>
            </View>
            
            {cart.map(item => (
              <View key={item.id} className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <View className="flex-row items-center flex-1">
                  <View className="bg-gray-100 rounded-lg p-1 mr-3">
                    <Image 
                      source={item.image} 
                      className="w-10 h-10 rounded" 
                      resizeMode="cover" 
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800">{item.name}</Text>
                    <Text className="text-[#FF6B35] font-bold">${item.price}</Text>
                  </View>
                </View>
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className={`rounded-full w-8 h-8 items-center justify-center ${
                      item.quantity <= 1 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    <Ionicons name="remove" size={16} color={item.quantity <= 1 ? '#9CA3AF' : '#000'} />
                  </TouchableOpacity>
                  <Text className="mx-3 font-semibold min-w-[20px] text-center">{item.quantity}</Text>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
                  >
                    <Ionicons name="add" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View className="border-t border-gray-200 pt-4 mt-2">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-lg">Total Amount:</Text>
                <Text className="text-[#FF6B35] font-bold text-xl">${getTotalAmount()}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Customer Information */}
        {cart.length > 0 && (
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <Text className="text-xl font-bold mb-4">Delivery Information</Text>
            
            <View className="mb-4">
              <Text className="text-gray-600 mb-2 font-medium">Full Name *</Text>
              <TextInput
                placeholder="Enter your full name"
                value={customerInfo.name}
                onChangeText={(text) => setCustomerInfo(prev => ({ ...prev, name: text }))}
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
                autoCapitalize="words"
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-600 mb-2 font-medium">Phone Number *</Text>
              <TextInput
                placeholder="Enter your phone number"
                value={customerInfo.phone}
                onChangeText={(text) => setCustomerInfo(prev => ({ ...prev, phone: text }))}
                keyboardType="phone-pad"
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-600 mb-2 font-medium">Delivery Address *</Text>
              <TextInput
                placeholder="Enter your complete delivery address"
                value={customerInfo.address}
                onChangeText={(text) => setCustomerInfo(prev => ({ ...prev, address: text }))}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white min-h-[80px]"
              />
            </View>

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
              <Text className="text-red-500 text-center mt-3 text-sm">
                ⚠️ Cannot connect to server. Please check your internet connection and ensure the backend is running.
              </Text>
            )}

            <Text className="text-gray-500 text-center mt-3 text-xs">
              By placing this order, you agree to our terms and conditions. We will contact you within 30-45 minutes to confirm delivery.
            </Text>
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