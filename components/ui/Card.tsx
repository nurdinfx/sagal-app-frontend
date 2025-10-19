import React from 'react';
import { View, Text } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <View className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}>
      {children}
    </View>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="mb-4">
      <Text className="text-xl font-bold text-text">{title}</Text>
      {subtitle && <Text className="text-gray-600 mt-1">{subtitle}</Text>}
    </View>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <View>{children}</View>;
};