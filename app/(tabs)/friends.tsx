import React from 'react';
import "../../global.css";
import { View, Text } from 'react-native';
import { useAuth } from '@/providers/AuthProvider'; // Import the useAuth hook

export default function () {
  const { user } = useAuth(); // Use the AuthContext to access user data
  console.log(user); // Log user data for debugging
  return (
     <View className="flex-1 items-center justify-center bg-white">
          <Text className='text-black font-bold text-3xl'>Friends</Text>
          
          {/* Display user data or any other relevant information */}
        </View>
  );
}
