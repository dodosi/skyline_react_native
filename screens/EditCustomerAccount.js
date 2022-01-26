import React, { useState, useEffect, useRef } from 'react';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View,Text,Image,TextInput,TouchableOpacity,Button,StyleSheet,Platform } from 'react-native';
import {globalStyles} from '../globals/styles';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
let mresponse='';
function registerAccount(firstName,lastName,phone,email,street,city,state,zipCode,token,password,type){
       let params = {
        'firstname': firstName,
        'lastname': lastName,
        'phone':phone,
        'email':email,
        'street_number':street,
        'city':city,
        'state':state,
        'zip_code':zipCode,
        'type':type,
        'token':expoPushToken,
        'password':password,         
        };  
         
        let formBody =[];
        for (let k in params) {
            let encodedKey = encodeURIComponent(k);
            let encodedValue = encodeURIComponent(params[k]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody=formBody.join("&");
        let request = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: formBody
        };
        console.log(JSON.stringify(request));
        fetch('http://skylineautoservices.co/admin/skyline/api/register2.php',request)
        .then((response) => response.text())
        .then(response =>  mresponse=response)
        .catch((error) => console.error(error))
        .finally(() => console.log(mresponse));

}
export default function EditCustomerAccount(props){
   // const exampleImage = require('../assets/odotravel.jpeg');
    const { route,navigation } = props
    const {item}=route.params;
    const [firstName,setFirstname]=useState(item.firstName);
    const [lastName,setLastname]=useState(item.lastName);
    const [phone,setPhone]=useState(item.phone);
    const [email,setEmail]=useState(item.email);
    const [password,setPassword]=useState('');
    const [cPassword,setCPassword]=useState('');
    const [currentPassword,setCurrentPassword]=useState('');
    const [type,setType]=useState('Customer');
    //const [token,setToken]=useState('mytoken');
   // const [date,setDate]=useState();
    const [isLoading, setLoading] = useState(true);
    //const [data, setData] = useState([]);
    
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [value, setValue] = useState();
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }, []);
     return (
       <ScrollView  style={globalStyles.scrollContainer}>
        <View  style={globalStyles.container}>
             <Text style={globalStyles.textHome}>Edit Customer Information</Text>
            <TextInput 
                
               style={globalStyles.textInput}
               onChangeText={(text)=>setFirstname(text)}
               value={firstName}
               placeholder="Enter your firstname"
               />
             <TextInput 
              style={globalStyles.textInput}
              onChangeText={(text)=>setLastname(text)}
              value={lastName}
              placeholder="Enter your lastname"
              />
            <TextInput 
              style={globalStyles.textInput}
              onChangeText={(text)=>setPhone(text)}
              value={phone}
              placeholder="Enter your phone"
              />
              <TextInput 
                style={globalStyles.textInput}
                onChangeText={(text)=>setEmail(text)}
                value={email}
                placeholder="Enter your Email"
               />
           <TextInput 
                style={globalStyles.textInput}
                onChangeText={(text)=>setCurrentPassword(text)}
                secureTextEntry={true}
                placeholder="Enter Current Password"
               />
            <TextInput 
                style={globalStyles.textInput}
                onChangeText={(text)=>setPassword(text)}
                secureTextEntry={true}
                placeholder="Enter New Password"
               />
               <TextInput 
                style={globalStyles.textInput}
                secureTextEntry={true}
                onChangeText={(text)=>setCPassword(text)}
                placeholder="Retype New Password"
               />
            <View>
      </View>
       <TouchableOpacity 
               style={globalStyles.button}
               onPress={()=>{
                if(password===cPassword){
                  if(firstName!=''&&lastName!=''&&lastName!=''&&phone!=''&&password!=''&&currentPassword!=''){
                    navigation.navigate('EditAccountNext',{item:{
                         firstName:firstName,
                         lastName:lastName,
                         email:email,
                         phone:phone,
                         type:'CUSTOMER',
                         password:password,
                         cpassword:currentPassword,
                         token:expoPushToken
                     }}); 
                    }else{
                      alert("Fill all required information");
                    }
                 }else{
                     alert("Passwords do not match!!");
                 }
                }
            }
               >
            <Text style={globalStyles.buttonText}>NEXT</Text>
            </TouchableOpacity>
            
        </View>
        </ScrollView>
    );
}
async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  