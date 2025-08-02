import React, { use } from 'react';
import "../global.css";
import { View, Text,TouchableOpacity } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import {useLocalSearchParams, usePathname} from 'expo-router'
import Header from '@/components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from '@/components/profile';
import {supabase}  from '@/utils/supabase';


export default function () {
    const params = useLocalSearchParams();
    const [user,setuser] = React.useState(null);
    const [following,setfollowing]=React.useState([]);
    const [follower,setfollower]=React.useState([]);
    console.log(params);

    const getUser  =async()=> {
      const {data,error}= await supabase.from('User').select('*').eq('id',params.user_id).single();
      if(error) return console.error(error);
       console.log('data of logged user',data);
      setuser(data);
    }


    React.useEffect(()=>{
      getUser();
    },[params.user_id]);


    const getfollowing=async() => {
      const {data,error}=await supabase.from('Follower').select('*').eq('user_id',params.user_id)
      if(error)return console.log(error)
      setfollowing(data);

    }
    const getfollower=async() => {
      const {data,error}=await supabase.from('Follower').select('*').eq('follower_user_id',params.user_id)
      if(error) return console.log(error)
      setfollower(data);

    }


    React.useEffect(()=>{
      getfollower();
      getfollowing();
    },[params.user_id]);

  return (
    <SafeAreaView className="flex-1">
        <Header title={user?.username} color="black" goBack/>
        <Profile
        user={user}
        following={following}
        follower = {follower}
        />
    </SafeAreaView>
  );
}
