
import React from 'react';
import "../../global.css";
import { Link, useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import {supabase} from '@/utils/supabase';
import { useAuth } from '@/providers/AuthProvider'; // Import the useAuth hook
 // Adjust the import based on your project structure
import { router } from 'expo-router';



export default function () {
    const router = useRouter();
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [username,setUsername] = React.useState('');
    const {signUp} = useAuth(); // Use the AuthContext to access signUp function
   

  return (
     <View className="flex-1 items-center justify-center bg-white">
        <View className="w-full p-4">
            <Text className='text-black text-center font-bold text-3xl mb-4'>Signup Page</Text>
            <TextInput 
        placeholder="Username"
        className="bg-white px-4 py -2 rounded-lg border border-grey-300 w-full" 
        value={username}
        onChangeText={setUsername}
        />
        <TextInput 
        placeholder="Email"
        className="bg-white px-4 py -2 rounded-lg border border-grey-300 w-full" 
        value={email}
        onChangeText={setEmail}
        />
        <TextInput 
        placeholder="Password"
        className="bg-white px-4 py -2 rounded-lg border border-grey-300 w-full" 
        value={password}
        onChangeText={setPassword}
        />
        
        <TouchableOpacity 
        className="bg-black px-4 py -2 rounded-lg border border-grey-300 w-full mt-4" 
        onPress={() => 
        signUp(username, email, password)}>
        <Text className='text-white font-bold  text-center text-lg border-black-200'>Signup</Text>
          
        </TouchableOpacity>
         </View>   
        </View>
  );
}

