import React,{useEffect, useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,BackHandler, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import {globalStyles} from '../globals/styles';
import {registerAccount, updateAccount,createTable} from '../data/DatabaseHandler';
//import Cities,{city}from '../components/Cities';
let mresponse='';

function Contact(props){
 
    const { route,navigation } = props
    //const {item}=route.params;
    const[email,setEmail]=useState('');
    const[names,setNames]=useState('');
    const[phone,setPhone]=useState('');
    const[message,setMessage]=useState('');
    const sendMessage=(names,email,phone,message)=>{
        let params = {
         'names': names,
         'email': email,
         'phone':phone,
         'message':message,
              
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
         fetch('http://skylineautoservices.co/admin/skyline/api/contactus.php',request)
         .then((response) => response.text())
         .then(response =>  mresponse=response)
         .catch((error) => console.error(error))
         .finally(() => {
             if(mresponse=='ok'){
                 alert('Message was sent!!!');
                 setNames('');
                 setEmail('');
                 setMessage('');
                 setPhone('');
                 }else{
                 alert('Sending Message Failed, Try Again!!');
             }
         });
 
 }
 const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () =>{
          //BackHandler.exitApp()
          navigation.navigate('Home');
       }  }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
    return(
      <ScrollView  style={{flex:1,
            padding:20,
            backgroundColor:'#ffffff',
            }}>
         <Text  style={globalStyles.text}>Enter Names</Text>
         <TextInput
          style={globalStyles.textInput}
          //value={item.firstname}
          onChangeText={(text)=>setNames(text)}
          value={names}
          />
         <Text  style={globalStyles.text}>Enter Email</Text>
         <TextInput
          style={globalStyles.textInput}
         // value={item.lastname}
          onChangeText={(text)=>setEmail(text)}
          value={email}
         />
         <Text  style={globalStyles.text}>Enter Phone</Text>
         <TextInput
            style={globalStyles.textInput}
            
            onChangeText={(text)=>setPhone(text)}
            value={phone}
         />
         <Text  style={globalStyles.text}>Enter Message</Text>
         <TextInput
           //multiline = {true}
           //numberOfLines = {2}
           style={globalStyles.textInput}
           onChangeText={(text)=>setMessage(text)}
           value={message}
          // value={item.phone}
         />
        <TouchableOpacity 
           onPress={()=>{
               if(names==''||email==''||phone==''||message==''){
                 alert("Please fill all required information!!");
               }else{
                sendMessage(names,email,phone,message);
               }
                   
            }}
           style={globalStyles.button} >
           { <Text style={globalStyles.buttonText}>SEND MESSAGE</Text> }
         </TouchableOpacity>               
       </ScrollView>
    );
}
export default Contact;
