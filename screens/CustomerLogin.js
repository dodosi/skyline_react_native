import React ,  {useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ActivityIndicator,View,Text,Image,TextInput,TouchableOpacity,Button,StyleSheet} from 'react-native';
import {globalStyles} from '../globals/styles';
import { ScrollView } from 'react-native-gesture-handler';
//import {ShowName, sum} from '../data/Data'
import { add, deleteData, getDataBy} from '../data/DatabaseHandler';
import Header from '../components/Header';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
let mresponse='';

function CustomerLogin(props){
    //const exampleImage = require('../assets/odotravel.jpeg');
    const exampleImage = require('../assets/skyline.jpg');
    const [email,setEmail]=useState('');
    const[type,setType]=useState('NA');
    const [password,setpassword]=useState();
    const [isLoading, setLoading] = useState(true);
    const [isLoging, setLoging] = useState(false);
    const data={email:email}
    const {navigation}=props;
    const [selectedValue, setSelectedValue] = useState({});
    const mdata=[{name:'abana'},{name:'ibyana'},{name:'utwana'},{name:'Urwana'}];
    
      useEffect(() => {
        
      const fetchData = async () => {
        const memail = await AsyncStorage.getItem('email').then( (value) =>{
          setEmail(value);  
          return value;
          });
        const mtype= await AsyncStorage.getItem('type').then( (value) => {
          return value;
        });    
        setEmail(memail);
        console.log("My "+mtype);
        console.log("My "+memail);
        if(memail!='NA' && mtype=='Customer'){
         navigation.navigate('Services',{item:{email:memail}});
         setLoading(false);
        }else{
          setLoading(false);
        }
      }
     fetchData();
       
     }, []);

      const login=(props,email,password) => {
      const {navigation}=props;
      let link="http://skylineautoservices.co/admin/skyline/api/login.php";
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
          if(mresponse==="ok"){
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('type', 'Customer');
            console.log('local data found'+email);
              navigation.navigate('Services',
              {item:{email:email}})
               
             }else{
               setLoging(false);
                alert("Invalid Email or password");
              }
        });
    }
  const resetPassword=(props,email) => {
      setLoging(true);
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
              {isLoging ? <ActivityIndicator  size="large" color="#00ff00" /> : (
              <></>
             )}
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                 setLoging(true) 
                 login(props,email,password) 
                 }
                }
                    
                >
                <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{navigation.navigate('CreateCustomerAccount',
                  {item:{email:email}})}}
                >
                <Text style={globalStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                 // alert(email);
                  if(email!='NA'||email!=''){
                     resetPassword(props,email);
                    }else{
                      alert("Please Enter Email");
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
export default CustomerLogin;