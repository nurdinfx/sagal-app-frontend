import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-black';
      case 'secondary':
        return 'bg-gray-600';
      case 'outline':
        return 'border-2 border-black bg-transparent';
      default:
        return 'bg-black';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2';
      case 'md':
        return 'px-6 py-3';
      case 'lg':
        return 'px-8 py-4';
      default:
        return 'px-6 py-3';
    }
  };

  const getTextColor = () => {
    return variant === 'outline' ? 'text-black' : 'text-white';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        flex-row items-center justify-center rounded-xl
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
    >
      {loading && <ActivityIndicator size="small" color={variant === 'outline' ? '#000000' : 'white'} className="mr-2" />}
      <Text className={`text-center font-semibold ${getTextColor()}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};