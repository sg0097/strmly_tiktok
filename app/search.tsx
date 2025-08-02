import React from 'react';
import "../global.css";
import { View, Text,TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '@/providers/AuthProvider'; // Import the useAuth hook
import { SafeAreaView } from 'react-native';
import Header from '@/components/header';
import {supabase} from '@/utils/supabase';
import {Ionicons} from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { Image } from 'react-native';


export default function () {
    const [text,settext] = React.useState('');
    const [results,setresults]= React.useState([]);


    const search=async()=>{
        console.log(text);
        const{data,error} = await supabase.from('User').select('*').eq('username',text);
        setresults(data);
    }


  
  return (
     <SafeAreaView>
        <Header title="Search" color="black" goBack/>
         <View className='flex-row gap-2 w-full mx-3 mb-16'>
          <TextInput
            className="flex-1  bg-white p-4 rounded-3xl border border-gray-300"
            placeholder="Search"
            onChangeText={(i) =>settext(i)}
            value={text}
            />
            <TouchableOpacity onPress={search}>
                <Ionicons name="arrow-forward-circle" size={50} color="red" />

            </TouchableOpacity>
            </View> 
            <FlatList
            data={results}
            renderItem={({user})=>
                <View className='flex-row items-center gap-2'>
                    <Image 
                    source={{ uri:'https://placehold.co/40x40' }} 
                    className="w-10 h-10 rounded-full bg-black" 
                    />
                    <View>
                     <Text className ='font-bold tet-base'>{user.username}</Text>
                    
                    </View>
                </View>}
            
            />
        </SafeAreaView>
  );
}