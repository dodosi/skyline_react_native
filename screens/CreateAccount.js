import React,{useEffect, useState} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import {globalStyles} from '../globals/styles';
import {registerAccount, updateAccount,createTable} from '../data/DatabaseHandler';

function CreateAccount(props){
 
    const { route,navigation } = props
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [item,setItem]=useState({})
    useEffect(()=>{
      try{ 
        setItem(route.params);
      } catch(e){
        console.log(e);
      }
    }
    );
   
    return(
       <ScrollView style={globalStyles.container}>
          
         <Text  style={globalStyles.text}>Enter First Name</Text>
         <TextInput
          style={globalStyles.textInput}
          //value={item.firstname}
          onChangeText={(text)=>setFirstName(text)}
          />
         <Text  style={globalStyles.text}>Enter Last Name</Text>
         <TextInput
          style={globalStyles.textInput}
         // value={item.lastname}
          onChangeText={(text)=>setLastName(text)}
         />
         <Text  style={globalStyles.text}>Enter Email</Text>
         <TextInput
            style={globalStyles.textInput}
            //value={item.email}
            onChangeText={(text)=>setEmail(text)}
         />
         <Text  style={globalStyles.text}>Enter Phone Number</Text>
         <TextInput
           style={globalStyles.textInput}
           onChangeText={(text)=>setPhone(text)}
          // value={item.phone}
         />
         <TouchableOpacity 
          
           onPress={()=>{
            navigation.navigate('CreateAccountNext',{item:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                phone:phone,
              }});
       
         ;
       }}
           style={globalStyles.button} >
           { <Text style={globalStyles.buttonText}>SAVE</Text> }
         </TouchableOpacity>
         
       </ScrollView>
    );
}
export default CreateAccount;
