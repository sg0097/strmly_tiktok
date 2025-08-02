import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import "../global.css";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native';
import {supabase} from '@/utils/supabase';
import { useAuth } from '@/providers/AuthProvider';
import {useRouter} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {Video,ResizeMode} from 'expo-av';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isrecording,setisrecording] = useState(false);
  const cameraRef = React.useRef<CameraView>(null);
  const VideoRef = React.useRef<Video>(null);
  const [videoUri,setvideoUri] = useState<string | null>(null);
   const {user} = useAuth();
   const router =useRouter();
   const [status,setStatus] = useState({isLoaded: false,isPlaying: false});




  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const recordVideo = async () => {
  if (isrecording) {
    setisrecording(false);
    cameraRef.current?.stopRecording();
  } else {
    setisrecording(true);
    try {
      const video = await cameraRef.current?.recordAsync();
      setvideoUri(video.uri);
    } catch (error) {
      console.error("Failed to record video:", error);
    }
  }
};


const saveVideo = async() =>{
  console.log(videoUri);
  const fileName = videoUri?.split('/').pop();
  const formData = new FormData();
  formData.append('file',{
    uri:videoUri,
    type:`video/${fileName?.split('.').pop()}`,
    name: fileName,
  })

  const {data,error} = 
  await supabase.storage.from('videos').upload(fileName, formData,{cacheControl : '3600000',upsert:false});


  if(error){
    console.error(error);
  }
  console.log(data);

  const {error:videoError} = await supabase.from('Video').insert({
    title: "test title",
    uri: data.path,
    user_id:user?.id
  });
  if(videoError) console.log(videoError);
  router.back();
}



   
const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    setvideoUri(result.assets[0].uri);
  };



  return (
        <View className="flex-1">
            {videoUri ? (
                <View className="flex-1">
                    <TouchableOpacity className="absolute bottom-20 left-32 z-10" onPress={saveVideo}>
                <Ionicons name="checkmark-circle" size={100} color="black" /> 
            </TouchableOpacity>
                <TouchableOpacity className="flex-1" onPress={() => status.isPlaying ? VideoRef.current?.pauseAsync() : VideoRef.current?.playAsync()}>
                <Video 
                ref={VideoRef}
                style={{
                    flex:1,
                    width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height

                }}
                source={{
                    uri: videoUri
                }}
                
                resizeMode={ResizeMode.COVER}
                isLooping
                onPlaybackStatusUpdate={status => setStatus (() => status)}
                />
            </TouchableOpacity>
            </View>
            ):
            <CameraView mode="video" ref={cameraRef} style={{flex: 1}} facing={facing}>
            <View className="flex-1 justify-end">
            <View className="flex-row  items-center justify-around mb-18">
            
                <TouchableOpacity className="items-end justify-end" onPress={pickImage}>
                    <Ionicons name="aperture" size={50} color="white" />
                </TouchableOpacity>
            {  
                videoUri ?(
            <TouchableOpacity className="item-end justify-end" onPress={saveVideo}>
            
                <Ionicons name="checkmark-circle" size={100} color="white" /> 
            </TouchableOpacity>
                ):(
                <TouchableOpacity className="item-end justify-end" onPress={recordVideo}>
            {isrecording ?
                <Ionicons name="pause-circle" size={100} color="white" /> : <Ionicons name="radio-button-on" size={100} color="white"/>}
            </TouchableOpacity>
                )}
            
            
            
            <TouchableOpacity className="items-end justify center" onPress={toggleCameraFacing}>
                <Ionicons name="camera-reverse" size={50} color="white" />
            </TouchableOpacity>
            </View>
            </View>
        </CameraView>
            }
       
        </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
