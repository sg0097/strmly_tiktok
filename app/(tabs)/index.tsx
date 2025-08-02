import React from 'react';
import "../../global.css";
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import {supabase } from "@/utils/supabase";
import { useState } from 'react';
import { FlatList } from 'react-native';
import {Video,ResizeMode} from 'expo-av';
import { Dimensions } from 'react-native';
import VideoPlayer from '@/components/video';
import Header from '@/components/header';
import { SafeAreaView } from 'react-native-safe-area-context';





if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}


export default function App() {
  
  const [videos,setvideos] = useState<string | null>(null);
  const [status,setStatus] = useState<string | null>(null);
  const [activeIndex,setactiveIndex] = useState<number | null>(null)
  

  React.useEffect(()=>{
    getVideos()
  },[])


  const getVideos = async() =>{
    const {data,error}= await supabase.from('Video').select('*,User(*)').order('created_at',{ascending:false})
    
    getsignedurl(data);
  }

  const getsignedurl = async(videos:string[]) => {
  const {data,error} = await supabase.storage.from('videos').createSignedUrls(videos.map((video)=>video.uri),60*60*24*7)
  let videourls = videos?.map((item) => {
    item.signedUrl=data?.find((signedUrl) => signedUrl.path===item.uri)?.signedUrl
    return item
  })
  setvideos(videourls)

  }

  

  
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <SafeAreaView className="absolute top-0 left-0 right-0 z-10 ">
      <Header title="For You" color="white"  search />
      </SafeAreaView>
      <FlatList
      data={videos}
      snapToInterval={Dimensions.get('window').height}
      snapToStart
      decelerationRate="fast"
      onViewableItemsChanged={e=>setactiveIndex(e.viewableItems[0].key)}
      renderItem={({item})=>
        <VideoPlayer 
                video={item}
                isViewable={true}
                isViewable={activeIndex === item.id}
                />
              }


      />
      

    </SafeAreaView>
  );
}
