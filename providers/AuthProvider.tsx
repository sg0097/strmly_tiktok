import {supabase} from '@/utils/supabase';
import { useRouter } from 'expo-router';
import React, { useEffect, useState, useContext } from 'react';

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}


export const AuthContext = React.createContext({
    user:null,
    signIn: async(email: string,password:string ) =>{},
    signUp: async(username:string,email: string,password:string ) =>{},
    signOut: async() => {},
    likes:[],
    following: [], // ✅ add this,
    follower:[],
    getLikes:async (userId:string) =>{},
    getfollowing:async (userId:string) =>{},
    getFollowers:async (userId:string) =>{},
});

export const useAuth = () => React.useContext(AuthContext);
 
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState(null);
    
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [likes,setlikes] = React.useState([]);
    const [following,setfollowing]=React.useState([]);
    const [follower,setfollower]=React.useState([]);
   

    const getLikes = async (userId:string) => {
        const { data,error } = await supabase.from('Like').select('*').eq('user_id', userId);
        if(error) return console.error(error);
        setlikes(data);
        console.log('likes', likes);
    }
    const getfollowing = async (userId:string) => {
        const { data,error } = await supabase.from('Follower').select('*').eq('user_id', userId);
        if(error) return console.error(error);
        setfollowing(data);
    }
    const getFollowers = async (userId:string) => {
        const { data,error } = await supabase.from('Follower').select('*').eq('follower_user_id', userId);
        if(error) return console.error(error);
        setfollower(data);
       
    }

    const getUser = async (id:string) => {
        const { data,error } = await supabase.from('User').select('*').eq('id', id).single();
        if(error) return console.error(error);
        console.log('Fetched user data:', data);
        setUser(data);
        console.log('User data:', data);
        

    }

   const signIn = async (email: string, password: string) => {
    if (!email || !password) {
        console.warn("Email and password are required");
        return;
    }

    console.log("SignIn started:", { email, password });

    try {
        console.log('Before');
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        console.log('After');

        console.log("SignIn response:", { data, error });

        if (error) {
            console.error("Supabase error:", error);
            return;
        }

        if (!data.user) {
            console.warn("No user returned");
            return;
        }

        console.log('User ID:', data.user.id);
        await getUser(data.user.id);
        router.push('/(tabs)');
        console.log('SignIn successful:', data.user);
    } catch (err) {
        console.error("Unexpected error:", err);
    }
};


   
    const signUp = async (username: string, email: string, password: string) => {
       const { data, error } = await supabase.auth.signUp({
                   email:email,
                   password:password,
                   options:{
                    data:{
                        name:username
                    }
                   }
           });
           if(error) return console.error(error);
           
            console.log('SignUp successful:', data.user);
           
    };
    


       const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
            return;
        }
        setUser(null);
        router.push('/(auth)');
    };


   useEffect(() => {
  const getInitialSession = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Error fetching session:', error);
    }

    if (session?.user) {
      console.log('Initial session found:', session.user);
      await getUser(session.user.id);
    } else {
      console.log('No initial session found');
      setUser(null);
    }

    setLoading(false);
  };

  getInitialSession();

  const { data: authListener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      console.log('Auth state changed:', event);

      if (session?.user) {
        await getUser(session.user.id);
      } else {
        setUser(null);
      }
    }
  );

  return () => {
    authListener.subscription.unsubscribe();
  };
}, []);




    
       
   if (loading) {
  return null; // or splash screen
}


     return <AuthContext.Provider 
            value={{user,signIn,signUp,signOut,likes,getLikes,getFollowers,getfollowing,following,follower}}>
            {children}
            </AuthContext.Provider>
                  
}


     


