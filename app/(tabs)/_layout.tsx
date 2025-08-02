// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useRouter} from 'expo-router';

 
export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        headerShown:  false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ 
           title:'Home',
          tabBarIcon: ({focused}) => <Ionicons name= {focused ? "home-sharp":"home-outline"} size={24} color="black" />, }}
      />
      {/* Add more tab screens here */}
       <Tabs.Screen
        name="friends"
        options={{ title: 'friends', tabBarIcon: ({focused}) => <Ionicons name= {focused ? "people":"people-outline"} size={24} color="black" /> }}
      />
        <Tabs.Screen
        name="empty"
        options={{ 
          title: '', 
          tabBarIcon: () => 
          <View className="absolute ">
            <Ionicons name="add-circle" size={32} color="black" alignment='centre' /> 
        </View>, 
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/camera');
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'profile', tabBarIcon: ({focused}) => <Ionicons name={focused ? "person":"person-outline"} size={24} color="black" /> 
       }}
      />
      <Tabs.Screen
        name="Inbox"
        options={{ title: 'inbox', tabBarIcon: ({focused}) => <Ionicons name={focused ? "chatbox-ellipses":"chatbox-ellipses-outline"} size={24} color="black" /> 
         }}
      />
      
    </Tabs>
  );
}
