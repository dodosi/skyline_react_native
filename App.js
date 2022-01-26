import React, { useRef,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStacks from './components/MyStacks';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  let email='';
  let type='';
  function setData(memail,mtype){
    email=memail;
    type=mtype;
  }
  useEffect(() => {
   
    const fetchData = async () => {
      const memail = await AsyncStorage.getItem('email').then( (value) =>{
          return value;
        });
      const mtype= await AsyncStorage.getItem('type').then( (value) => {
        return value;
      });    
      setData(memail,mtype);
    }
   fetchData();
    
  }, []);

   return (
    < >
       <NavigationContainer>
           <MyStacks 
            email={email}
            type={type}
            />
       </NavigationContainer> 
   </>
  );
}