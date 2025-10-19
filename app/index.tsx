import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      
      {/* Local Background Image */}
      <Image 
        source={require('../assets/images/Generated Image October 12, 2025 - 5_51AM.png')}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      
      {/* Dark overlay for better text readability */}
      <View className="absolute w-full h-full bg-black/40" />

      {/* Content Container */}
      <View className="flex-1">
        {/* Header Section */}
        <View className="bg-transparent pt-16 pb-4 px-6">
          <View className="items-center mb-2">
            <View className="bg-white/20 rounded-full p-4 mb-3">
              <Ionicons name="flame" size={40} color="#FF6B35" />
            </View>
            <Text className="text-white text-3xl font-bold text-center">
              SAGAL-GAS
            </Text>
            <Text className="text-white/90 text-lg text-center">
              FAST GAS DELIVERY
            </Text>
          </View>
          
          {/* Status Display */}
          <View className="items-center mb-6">
            <View className="bg-green-500/20 px-4 py-2 rounded-full">
              <Text className="text-green-400 text-sm font-bold">🚚 READY FOR DELIVERY</Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View className="px-6 mb-8">
            <View className="bg-white/95 rounded-2xl p-6 shadow-lg">
              <View className="items-center mb-4">
                <Image 
                  source={require('../assets/images/gas1.jpg')}
                  className="w-24 h-24 rounded-lg mb-4"
                  resizeMode="cover"
                />
                <Text className="text-black text-2xl font-bold text-center mb-2">
                  30-45 Daqiiqadaha uu dalabku kuugu imanayo
                </Text>
                <Text className="text-gray-600 text-center mb-4 text-base">
                  Fresh gas cylinders delivered to your door
                </Text>
              </View>
              
              <Link href="/menu" asChild>
                <TouchableOpacity className="bg-[#FF6B35] rounded-xl py-4 flex-row items-center justify-center">
                  <Ionicons name="cart" size={24} color="white" />
                  <Text className="text-white text-center text-lg font-bold ml-2">
                    HADA DALBO
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Features Section */}
          <View className="px-6 mb-8">
            <Text className="text-white text-xl font-bold mb-4 text-center">Why Choose Us?</Text>
            
            <View className="flex-row flex-wrap justify-between">
              <View className="items-center w-1/2 mb-4">
                <View className="bg-white/20 rounded-full w-16 h-16 items-center justify-center mb-2">
                  <Ionicons name="flash" size={24} color="#FF6B35" />
                </View>
                <Text className="text-white text-sm font-semibold text-center">Fast Delivery</Text>
              </View>
              
              <View className="items-center w-1/2 mb-4">
                <View className="bg-white/20 rounded-full w-16 h-16 items-center justify-center mb-2">
                  <Ionicons name="card" size={24} color="#FF6B35" />
                </View>
                <Text className="text-white text-sm font-semibold text-center">Best Price</Text>
              </View>
              
              <View className="items-center w-1/2">
                <View className="bg-white/20 rounded-full w-16 h-16 items-center justify-center mb-2">
                  <Ionicons name="shield-checkmark" size={24} color="#FF6B35" />
                </View>
                <Text className="text-white text-sm font-semibold text-center">Safe & Secure</Text>
              </View>
              
              <View className="items-center w-1/2">
                <View className="bg-white/20 rounded-full w-16 h-16 items-center justify-center mb-2">
                  <Ionicons name="thumbs-up" size={24} color="#FF6B35" />
                </View>
                <Text className="text-white text-sm font-semibold text-center">Quality Service</Text>
              </View>
            </View>
          </View>

          {/* Products Preview */}
          <View className="px-6 mb-8">
            <Text className="text-white text-xl font-bold mb-4 text-center">OUR PRODUCTS</Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row">
                {/* Gas Cylinder Card */}
                <View className="bg-white/95 rounded-xl p-4 mr-4 shadow-lg border border-gray-200 w-40">
                  <View className="items-center mb-3">
                    <Image 
                      source={require('../assets/images/gas1.jpg')}
                      className="w-16 h-16 rounded-lg mb-2"
                      resizeMode="cover"
                    />
                    <Text className="text-black font-semibold text-center text-sm mb-1">25KG Gas</Text>
                    <Text className="text-[#FF6B35] font-bold text-lg">$38</Text>
                  </View>
                </View>
                
                {/* Cooker Card */}
                <View className="bg-white/95 rounded-xl p-4 mr-4 shadow-lg border border-gray-200 w-40">
                  <View className="items-center mb-3">
                    <Image 
                      source={require('../assets/images/cooker2.jpg')}
                      className="w-16 h-16 rounded-lg mb-2"
                      resizeMode="cover"
                    />
                    <Text className="text-black font-semibold text-center text-sm mb-1">Gas Cooker</Text>
                    <Text className="text-[#FF6B35] font-bold text-lg">$45</Text>
                  </View>
                </View>
                
                {/* Accessories Card */}
                <View className="bg-white/95 rounded-xl p-4 shadow-lg border border-gray-200 w-40">
                  <View className="items-center mb-3">
                    <Image 
                      source={require('../assets/images/menu1.jpg')}
                      className="w-16 h-16 rounded-lg mb-2"
                      resizeMode="cover"
                    />
                    <Text className="text-black font-semibold text-center text-sm mb-1">Gas Pipes</Text>
                    <Text className="text-[#FF6B35] font-bold text-lg">$4</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Contact Info */}
          <View className="px-6 mb-8">
            <View className="bg-black/30 rounded-2xl p-6">
              <Text className="text-white text-lg font-bold text-center mb-3">24/7 Customer Support</Text>
              <View className="flex-row items-center justify-center">
                <Ionicons name="call" size={20} color="#FF6B35" />
                <Text className="text-white text-lg ml-2">+1 (234) 567-8900</Text>
              </View>
              <Text className="text-white/80 text-center mt-2">Call us anytime for delivery</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View className="bg-white border-t border-gray-200 px-6 py-4">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity className="items-center flex-1">
              <Ionicons name="home" size={24} color="#FF6B35" />
              <Text className="text-[#FF6B35] text-sm font-bold mt-1">Home</Text>
            </TouchableOpacity>
            
            <Link href="/menu" asChild>
              <TouchableOpacity className="items-center flex-1">
                <Ionicons name="menu" size={24} color="#6B7280" />
                <Text className="text-gray-500 text-sm mt-1">Menu</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/orders" asChild>
              <TouchableOpacity className="items-center flex-1">
                <Ionicons name="time" size={24} color="#6B7280" />
                <Text className="text-gray-500 text-sm mt-1">Status</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}