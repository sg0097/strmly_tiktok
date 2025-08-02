import React, { use } from 'react';
import "../global.css";

import { View, Text,TouchableOpacity,Image} from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const addProfilePicture= async() => {
  
}

export default function ({user,following,follower}:{user:any,following:any,follower:any}) {
   const {user:authUser,signOut} = useAuth();
  return (
    <SafeAreaView className=" flex-1 items-center ">
        <TouchableOpacity onPress={addProfilePicture}>
          <Image 
          source={{uri:'./assests/images/icon.png'}}
          className="w-20 h-20 rounded-full bg-black"
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold my-3 ">!{user?.username}</Text>
        <View className="flex-row items-center justify-around w-full my-3">
          <View className="items-center justify-center">
          <Text className="text-md font-semibold ">Following</Text>
          <Text className="text-md">{following.length}</Text>
        </View>
        <View className=" items-center justify-center">
          <Text className="text-md font-semibold ">Followers</Text>
          <Text className="text-md">{follower.length}</Text>
        </View>
         <View className="items-center justify-center">
          <Text className="text-md font-semibold ">Likes</Text>
          <Text className="text-md">1000</Text>
        </View>
        </View>
      
      <TouchableOpacity  className="bg-black px-4 py-2 rounded-lg m-3 w-full" onPress={signOut}>
      <Text className='text-white font-bold text-3xl'>
        Signout
      </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}