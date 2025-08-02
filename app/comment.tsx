import React from 'react';
import "../global.css";
import {useAuth} from '@/providers/AuthProvider';
import { View, Text,TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {supabase} from '@/utils/supabase';




export default function () {
    const {user} =useAuth();
    const params = useLocalSearchParams();
    const [comments,setcomments] = React.useState<any[]>([]);
    const [text,settext] = React.useState<string>('');
    console.log(params);


    React.useEffect(()=>{
        getcomments()
    },[])

    const getcomments = async()=>{
        const {data,error} = await supabase.from('Comment').select('*').eq('video_id',params.video_id);
        if(error){
            return console.log.error;
        }
        setcomments(data)
}

     const addComment = async() =>{
     const {error}= await supabase.from('Comment').insert({
      user_id:user.id,
      video_id:params.video.id,
      text:'Hello',
     });
     if(error){
        console.error(error);
     }
     getcomments();
     }

    

  return (
     <View className="flex-1 items-center justify-center bg-white">
          <Text className='text-black font-bold text-3xl'>comment</Text>
          <TextInput
           placeholder="add a comment"
           onChangeText={(i)=>settext(i)}
           value={text}


          
          />

          <TouchableOpacity onPress={addComment}>
           <Text>add</Text>
          </TouchableOpacity>
        </View>
  );
}
