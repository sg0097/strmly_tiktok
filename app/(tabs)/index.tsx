import React from 'react';
import "../../global.css";
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

export default function App() {
  const { user } = useAuth(); // Destructure user from useAuth
  console.log(user); // Log user data for debugging
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-black font-bold text-3xl'>Home</Text>
      <Text>{JSON.stringify(user)}</Text>

    </View>
  );
}
