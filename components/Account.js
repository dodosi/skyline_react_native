import React from 'react';
import {globalStyles} from '../globals/styles';
import {View,Text,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {getDataBy} from '../data/DatabaseHandler';
import {getDistanceFromLatLonInKm,getLocation} from '../utils/utils';
import { useEffect } from 'react/cjs/react.production.min';

function Account(props){
    const navigation = useNavigation(); 
 
return (
    <View >
     {props.type=='Driver'? 
     <Image
        source={{
          uri:props.uri
           }}
           style={{
            alignSelf: 'stretch',
            marginLeft:"auto",
            marginRight:"auto",
            height: 200,
            width: 300,
            borderWidth: 1,
          }}
          resizeMode="stretch"
      />:<></>}
      <View style={{flex: 1, flexDirection: 'row'}}>
         <Text  style={globalStyles.textAccount}>First Name:</Text>
        <Text  style={globalStyles.textAccountLabel}>{props.firstname}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text  style={globalStyles.textAccount}>Last Name:</Text>
        <Text  style={globalStyles.textAccountLabel}>{props.lastname}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
         <Text  style={globalStyles.textAccount}>Phone:</Text>
         <Text  style={globalStyles.textAccountLabel}>{props.phone}</Text>
    </View>
    <View style={{flex: 1, flexDirection: 'row'}}>
       <Text  style={globalStyles.textAccount}>Email:</Text>
       <Text  style={globalStyles.textAccountLabel}>{props.email}</Text>
     </View>
     <View style={{flex: 1, flexDirection: 'row'}}>
        <Text  style={globalStyles.textAccount}>Street Number:</Text>
        <Text  style={globalStyles.textAccountLabel}>{props.street_number}</Text>
     </View>
     <View style={{flex: 1, flexDirection: 'row'}}>
        <Text  style={globalStyles.textAccount}>State:</Text>
        <Text  style={globalStyles.textAccountLabel}>{props.city}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
         <Text  style={globalStyles.textAccount}>Zip Code:</Text>
         <Text  style={globalStyles.textAccountLabel}>{props.zip_code}</Text>
     </View>
     <TouchableOpacity 
              style={globalStyles.button}
              onPress={ ()=>{
               if(props.type=='Driver'){
                  navigation.navigate('EditDriverAccount',
                     {item:{
                        firstName:props.firstname,
                        lastName:props.lastname,
                        email:props.email,
                        phone:props.phone,
                        type:'DRIVER',
                        token:props.token
                     }}
                  )
               }else{
                  navigation.navigate('EditCustomerAccount',
                     {item:{
                        firstName:props.firstname,
                        lastName:props.lastname,
                        email:props.email,
                        phone:props.phone,
                        type:'CUSTOMER',
                        token:props.token
                     }})
                }
               }
               }  
              
              >
      <Text style={globalStyles.buttonText}>EDIT</Text>
     </TouchableOpacity>
    
      {(props.type=='Driver')?
      <View>
       <TouchableOpacity 
         style={globalStyles.button}
         onPress={ ()=>{navigation.navigate('AddDocuments',{item: {email:props.email}})}}
         >
         <Text style={globalStyles.buttonText}>Add Documents</Text>
       </TouchableOpacity>
       </View>
        :       
          <>
          <TouchableOpacity 
       style={globalStyles.button}
       onPress={ ()=>{navigation.navigate('Services',{item: {email:props.email}})}}
       >
       <Text style={globalStyles.buttonText}>NEXT</Text>
       </TouchableOpacity>
          </>
       }
   </View>
   
 );
}
export default Account;