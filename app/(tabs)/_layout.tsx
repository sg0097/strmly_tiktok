// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function TabLayout() {
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
          title: 'Home', 
          tabBarIcon: ({focused}) => <Ionicons name= {focused ? "home-sharp":"home-outline"} size={24} color="black" />, }}
      />
      {/* Add more tab screens here */}
       <Tabs.Screen
        name="friends"
        options={{ title: 'friends', tabBarIcon: ({focused}) => <Ionicons name= {focused ? "people":"people-outline"} size={24} color="black" /> }}
      />
        <Tabs.Screen
        name="camera"
        options={{ 
          title: 'camera', 
          tabBarIcon: ({focused}) => 
          <View className="absolute ">
            <Ionicons name="add-circle" size={32} color="black" alignment='centre' /> 
        </View>, 
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
