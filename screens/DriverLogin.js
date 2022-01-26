import React ,  {useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ActivityIndicator,View,Text,Image,TextInput,TouchableOpacity,SafeAreaView,Button,StyleSheet} from 'react-native';
import {globalStyles} from '../globals/styles';
import { ScrollView } from 'react-native-gesture-handler';
//import {ShowName, sum} from '../data/Data'
import { add, deleteData, getDataBy} from '../data/DatabaseHandler';
import Header from '../components/Header';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

let mresponse='';

  
function DriverLogin(props){
    const exampleImage = require('../assets/skyline.jpg');
    const[email,setEmail]=useState('NA');
    const[type,setType]=useState('NA');
    const [password,setpassword]=useState();
    const [isLoading, setLoading] = useState(true);
    const [isloging, setLoging] = useState(false);
    const {navigation}=props;

     const formattedDate=()=>date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()>10?date.getDate():"0"+date.getDate())
     useEffect(() => {

      const fetchData = async () => {
        const memail = await AsyncStorage.getItem('email').then( (value) =>{
          setEmail(value);  
          return value;
          });
        const mtype= await AsyncStorage.getItem('type').then( (value) => {
          setType(value);
          return value;
        });
        if(memail!='NA' && mtype=='Driver'){
          navigation.navigate('PendingRequests',{item:{email:memail}});
          setLoading(false);
        }else{
          setLoading(false);
        }
       
      }
      fetchData();
     
      
     }, []);
     const login=(props,email,password)=>{
      const {navigation}=props;
      let link="http://skylineautoservices.co/admin/skyline/api/driverlogin.php";
      fetch(link,{
          method: 'POST',
          headers: new Headers({
                     'Content-Type': 'application/x-www-form-urlencoded',
            }),
          body: "email="+email+"&password="+password
        })
        .then((response) => response.text())
        .then(response =>  mresponse=response)
        .then((json) => console.log(json))
        .catch((error) => console.error(error))
        .finally(() =>{
          if(mresponse=="ok"){
             AsyncStorage.setItem('email', email);
             AsyncStorage.setItem('type', 'Driver');
             console.log('local data found'+email);
             navigation.navigate('PendingRequests',{item:{email:email}})
          }else{
                setLoging(false);
                alert("Invalid Email or password");
          }
        });
    }
    const resetPassword=(props,email) => {
      const {navigation}=props;
      let link="http://skylineautoservices.co/admin/skyline/api/sendpasswordresetcode.php";
      fetch(link,{
          method: 'POST',
          headers: new Headers({
                     'Content-Type': 'application/x-www-form-urlencoded',
            }),
          body: "email="+email
        })
        .then((response) => response.text())
        .then(response =>  mresponse=response)
        .then((json) => console.log(json))
        .catch((error) => console.error(error))
        .finally(() =>{
          if(mresponse=="ok"||mresponse==="0ok"){
              setLoging(false);
              navigation.navigate('ResetPassword',{item:{email:email}})
          }else{
                setLoging(false);
                alert("Try Again!!");
          }
        });
    }
     return (
      (isLoading?<Text>Loading</Text>:
        <ScrollView style={globalStyles.scrollContainer}>
        <View style={globalStyles.container}>
             
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
                       
            <Text style={globalStyles.text}>Enter Email</Text>
            <TextInput 
               style={globalStyles.textInput}
               onChangeText={(text)=>setEmail(text)}
              
               />
            <Text style={globalStyles.text}>Enter Password</Text>
            <TextInput 
              style={globalStyles.textInput}
              secureTextEntry={true}
              onChangeText={(text)=>setpassword(text)}
             />
                {isloging? <ActivityIndicator  size="large" color="#00ff00" /> : (
              <></>)}
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                  setLoging(true);
                  login(props,email,password);
                 
                 }
                }
                  
                >
                <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{navigation.navigate('CreateDriverAccount',
                  {item:{email:email}})}}
                >
                <Text style={globalStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                  
                  if(email==='NA'||email===''){
                    alert("Enter email address!");
                  }else{
                      setLoging(true);
                      resetPassword(props,email);
                    }
                 }
                }
               >
                <Text style={globalStyles.buttonText}>Forget password</Text>
            </TouchableOpacity>
            <View>
      </View>
      </View>
      </ScrollView>
     )
     );
}
export default DriverLogin;