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
        'token':token,
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
export default function CreateCustomerAccount(props){
    //const exampleImage = require('../assets/odotravel.jpeg');
    const [firstName,setFirstname]=useState('');
    const [lastName,setLastname]=useState('');
    const [phone,setPhone]=useState('');
    const [email,setEmail]=useState('');
    const [streetNumber,setStreetNumber]=useState('');
    const [zipCode,setZipCode]=useState('');
    const [password,setPassword]=useState('');
    const [cPassword,setCPassword]=useState('');
    const [type,setType]=useState('Customer');
   // const [date,setDate]=useState();
    const [isLoading, setLoading] = useState(true);
    //const [data, setData] = useState([]);
    const {navigation}=props;
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
       <ScrollView style={styles.container}>
        <View >
          <View style={{ flex: 1, padding: 24 }}> 
             <Text style={globalStyles.text}>New Customer Information</Text>
            <TextInput 
               style={globalStyles.textInput}
               onChangeText={(text)=>setFirstname(text)}
               placeholder="Enter your firstname"
               />
             <TextInput 
              style={globalStyles.textInput}
              onChangeText={(text)=>setLastname(text)}
              placeholder="Enter your lastname"
              />
            <TextInput 
              style={globalStyles.textInput}
              onChangeText={(text)=>setPhone(text)}
              placeholder="Enter your phone"
              />
              <TextInput 
                style={globalStyles.textInput}
                onChangeText={(text)=>setEmail(text)}
                placeholder="Enter your Email"
               />
            
            <TextInput 
                style={globalStyles.textInput}
                onChangeText={(text)=>setPassword(text)}
                secureTextEntry={true}
                placeholder="Enter Password"
               />
               <TextInput 
                style={globalStyles.textInput}
                secureTextEntry={true}
                onChangeText={(text)=>setCPassword(text)}
                placeholder="Retype password"
               />
            
   

            <View>
      </View>
       <TouchableOpacity 
               style={globalStyles.button}
               
                onPress={()=>{
                    if(password===cPassword){
                      if(firstName!=''&&lastName!=''&&lastName!=''&&phone!=''&&password!=''&&cPassword!=''){
                  
                        navigation.navigate('CreateAccountNext',{item:{
                             firstName:firstName,
                             lastName:lastName,
                             email:email,
                             phone:phone,
                             type:'CUSTOMER',
                             password:password,
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
            <Text style={globalStyles.buttonText}>Next</Text>
            </TouchableOpacity>
            
        </View>
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
        vibrate:true,
        sound:true
      });
    }
  
    return token;
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
    },
    titleText: {
      padding: 8,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    headingText: {
      padding: 8,
    },
  });