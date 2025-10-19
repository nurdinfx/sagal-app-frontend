import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  onAddToCart,
}) => {
  return (
    <View className="w-[48%] bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <View className="items-center mb-2">
        <Text className="text-4xl mb-2">{image}</Text>
        <Text className="text-lg font-semibold text-text text-center">{name}</Text>
        <Text className="text-primary text-xl font-bold mt-1">${price}</Text>
      </View>
      <TouchableOpacity onPress={onAddToCart} className="bg-primary rounded-xl py-2 mt-2">
        <Text className="text-white text-center font-semibold">Hada DALBO</Text>
      </TouchableOpacity>
    </View>
  );
};