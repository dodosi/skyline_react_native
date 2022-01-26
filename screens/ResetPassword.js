import React ,  {useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ActivityIndicator,View,Text,Image,TextInput,TouchableOpacity,Button,StyleSheet} from 'react-native';
import {globalStyles} from '../globals/styles';
//import {ShowName, sum} from '../data/Data'
import { add, deleteData, getDataBy} from '../data/DatabaseHandler';
import Header from '../components/Header';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

let mresponse='';

function ResetPassword(props){
    const exampleImage = require('../assets/skyline.jpg');
     const [password,setpassword]=useState();
    const [cpassword,setcpassword]=useState();
    const [code,setCode]=useState();
    const [isLoading, setLoading] = useState(false);
    const { route,navigation } = props
    const {item}=route.params;
    const email=item.email;
    
    const reset=(props,email,password,code)=>  {
      const {navigation}=props;
      alert(email);
      if(password=="" && code==""){
          alert("Invalid inputs"); 
       }else{
       let link="http://skylineautoservices.co/admin/skyline/api/resetpassword.php";
          fetch(link,{
               method: 'POST',
               headers: new Headers({
                     'Content-Type': 'application/x-www-form-urlencoded',
            }),
          body: "email="+email+"&password="+password+"&code="+code
        })
        .then((response) => response.text())
        .then(response =>  mresponse=response)
        .then((json) => console.log(json))
        .catch((error) => console.error(error))
        .finally(() =>{
          setLoading(false);
          if(mresponse=="ok"){
             alert("Password was Reset successfully"); 
             navigation.navigate('Tab');
          }else{
                alert("Try Again");
          }
        });
      }
    }
     
     return (
      
        <ScrollView style={globalStyles.scrollContainer}>

        <View style={globalStyles.body}>
              <Image
               style={{
                alignSelf: 'stretch',
                marginLeft:"auto",
                marginRight:"auto",
                height: 100,
                width: 300,
                borderWidth: 1,
              }}
                source={exampleImage}
                resizeMode="stretch"
                
            />
            
           
            <Text style={globalStyles.text}>Enter Verification Code</Text>
            <TextInput 
               style={globalStyles.textInput}
               onChangeText={(text)=>setCode(text)}
               />
            <Text style={globalStyles.text}>Enter New Password</Text>
            <TextInput 
              style={globalStyles.textInput}
              secureTextEntry={true}
              onChangeText={(text)=>setpassword(text)}
              />
              <Text style={globalStyles.text}>Confirm Password</Text>
            <TextInput 
              style={globalStyles.textInput}
              secureTextEntry={true}
              onChangeText={(text)=>setcpassword(text)}
              
              />
              {isLoading?<ActivityIndicator size="large"color="#00ff00" /> :(
               <></>
               )}
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                  setLoading(true);
                    if(password!=cpassword){
                       alert("Passwords should match") 
                    }else{
                        reset(props,email,password,code)
                    }
                   }
                  }
                >
                <Text style={globalStyles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <View>
        </View>
       </View>
     </ScrollView>
    );
}
export default ResetPassword;