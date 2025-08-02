import React, { use } from 'react';
import "../../global.css";

import { View, Text,TouchableOpacity,Image} from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from '@/components/profile';
export default function(){
  const{user,signOut,following,follower} = useAuth();

  return <Profile user={user} following={following} follower={follower} />
}