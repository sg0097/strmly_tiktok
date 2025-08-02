import React from 'react';
import "../global.css";
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity,Share } from 'react-native';
import {supabase } from "@/utils/supabase";
import { useState } from 'react';
import { FlatList } from 'react-native';
import {Video,ResizeMode} from 'expo-av';
import { Dimensions } from 'react-native';
import { Ionicons,FontAwesome } from '@expo/vector-icons'; // ✅ Only works with Babel plugin enabled (not always reliable)


if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}


export default function ({video,isViewable}:{video:any,isViewable:boolean}) {
  const videoRef = React.useRef<Video>(null);
  const router = useRouter();
  const {user,likes,getLikes,getFollowers,getfollowing, following} = useAuth();
  const [isliked,setisliked]=React.useState(false);


  React.useEffect(()=>{
    if(isViewable){
        videoRef.current?.playAsync()
    }
    else{
        videoRef.current?.pauseAsync()
    }
  },[isViewable])

  const shareVideo = () =>{
    Share.share({
        message:`check out this video: ${video.title}`
    })
  }

  const likeVideo = async() =>{
    const {data,error}=await supabase.from('Like').insert({
        user_id:user?.id,
        video_id:video.id,
        video_user_id:video.User.id
    })
    if(!error) getLikes(user?.id)
  }     

const unlikevideo = async() =>{
    const {data,error}=await supabase.from('Like').delete().eq('user_id',user?.id).eq('video_id',video.id)

    if(!error) getLikes(user?.id)
  }      


const followUser =async () =>{
  const {error} = await supabase.from('Follower').insert({
    user_id:user?.id,
    follower_user_id:video.User.id
  })
  if(!error) getfollowing(user?.id)
}


const unfollowuser = async() => {
  const {error}=await supabase
  .from('Follower')
  .delete()
  .eq('user_id',user?.id)
  .eq('follower_user_id',video.User.id)
}

  return (
    <View>
     <Video 
                ref={videoRef}
                style={{
                    flex:1,
                    width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height

                }}
                source={{
                    uri: video.signedUrl
                }}
                
                resizeMode={ResizeMode.COVER}
                isLooping
               
                />
                
                <View className="absolute bottom-28 left-0 right-0">
                    <View className="flex-1 flex-row items-end justify-between m-3">
                    <View>
                <Text className="text-white text-2xl font-bold mt-18">{video.User.username}</Text>
                <Text className="text-white text-2xl font-bold mt-18">{video.title}</Text>
                </View>
                <View>
                    <TouchableOpacity className="m-4">
                        <Ionicons name="person" size={40} onPress={()=>router.push(`/user?user_id=${video.User.id}`)} color="white"/>
                    </TouchableOpacity>
                    {
                      following.filter((following:any)=>following.follwer_user_id===video.User.id).length>0?(
                        <TouchableOpacity className="absolute-bottom-1 right-1 bg-red-500 rounded-full items-center justify-center" onPress={followUser}>
                        <Ionicons name="add" size={21} color="white" />
                        </TouchableOpacity>
                      ):(
                        <TouchableOpacity className="absolute-bottom-1 right-1 bg-red-500 rounded-full items-center justify-center" onPress={unfollowuser}>
                        <Ionicons name="remove" size={21} color="white" />
                        </TouchableOpacity>

                      )
                    }


                    <TouchableOpacity className="m-4 absolute bg-red-400 rounded-full items-center justify-center" onPress={followUser}>
                            <Ionicons name="add" size={15} color="white"/>
                    </TouchableOpacity>

                    {likes.filter((like:any)=> like.video_id === video.id).length>0? 
                    (
                    <TouchableOpacity className="m-4" onPress={unlikevideo}>
                        <Ionicons name="heart" size={40} color="white"/>
                        </TouchableOpacity>
                        ):(
                            <TouchableOpacity className="m-4" onPress={likeVideo}>
                            <Ionicons name="heart-outline" size={40} color="white"/>
                    </TouchableOpacity>
                    )}
                    


                    <TouchableOpacity className="m-4">
                        <Ionicons name="chatbubble-ellipses" onPress={()=>router.push(`/comment?video_id=${video.id}`)} size={40} color="white"/>{}
                    </TouchableOpacity>


                    <TouchableOpacity className="m-4" onPress={shareVideo}>
                        <FontAwesome name="share" size={40} color="white"/>
                    </TouchableOpacity>
                </View>
                </View>
             </View>
         </View>
                

  ); 
}
