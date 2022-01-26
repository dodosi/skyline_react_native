import React,{useState,useEffect,useRef } from 'react';
import { Text, View,Image,TouchableOpacity,ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import { WebView } from 'react-native-webview';
import {globalStyles} from '../globals/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function HomeScreen(props) {
  
  const navigation = useNavigation(); 
  const [renderedOnce, setRenderedOnce] = useState(false);
  const exampleImage = require('../assets/skyline.jpg');
  const updateSource = () => {
      setRenderedOnce(true);
   };
   const [expoPushToken, setExpoPushToken] = useState('');
   const [notification, setNotification] = useState(false);
   const notificationListener = useRef();
   const responseListener = useRef();
   const [value, setValue] = useState();
   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
       setNotification(notification);
       //alert("Received!!!");
       navigation.navigate('NotificationPage',{item:{
           title: notification.request.content.title,
           message:notification.request.content.body,
           notification:notification
          }});
       });
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
       //navigation.navigate('NotificationPage');
     });
   
    return (
      <View style={globalStyles.container}>
           
        <Text style={globalStyles.textHome}>Welcome to Skyline</Text>
        <Image
          style={{
          alignSelf: 'stretch',
          marginLeft:"auto",
          marginRight:"auto",
          height: 100,
          width: 300,
          borderWidth: 0,
        }}
          source={exampleImage}
          resizeMode="stretch"
          
      />
      
      <TouchableOpacity
        style={globalStyles.button}
        onPress={ ()=>{navigation.navigate('CustomerLogin')}}
        >   
        <Text style={globalStyles.buttonText}>Enter As Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={ ()=>{navigation.navigate('DriverLogin')}}
        >
         <Text style={globalStyles.buttonText}>Enter As Driver</Text>
      </TouchableOpacity>
      
   </View>
       
      );
}
export default HomeScreen;