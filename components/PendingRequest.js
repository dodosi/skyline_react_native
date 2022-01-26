import React, { useState } from 'react';
import {globalStyles} from '../globals/styles';
import {View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {getDistanceFromLatLonInKm,getLocation} from '../utils/utils';


function PendingRequest(props){
    const navigation = useNavigation(); 
   
  return (
     <View style={globalStyles.ticket_row}>
         <Text style={globalStyles.text}>Customer Information</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>First Name</Text>
            <Text style={globalStyles.textvalue}>{props.firstname}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Last Name</Text>
            <Text style={globalStyles.textvalue}>{props.lastname}</Text>
        </View>
        <Text style={globalStyles.text}>Pick up Address</Text>
        <Text style={globalStyles.textvalue}>
          {props.cstreet_number+","+props.ccity+","+props.cstate+","+props.czip_code}
        </Text>
        <Text style={globalStyles.text}>Garage Information</Text>
          <Text style={globalStyles.textvalue}>
            {props.gstreet_number+","+props.gcity+","+props.gstate+","+props.gzip_code}
          </Text>
      
        
        <Text style={globalStyles.text}>Pickup Information</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Date:</Text>
            <Text style={globalStyles.buttonText}>{props.date}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Time:</Text>
            <Text style={globalStyles.buttonText}>{props.time}</Text>
      </View>
       
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={()=>{
              //book(props.id,props.ticket_number,(props.price+props.service_fee));
              navigation.navigate('RequestDetails',{item:{id:props.id,email:props.email,type:'Driver'}});
            }
        }
        >
         <Text style={globalStyles.buttonText}>View Details</Text>
        </TouchableOpacity>
     </View>
  );
}
export default PendingRequest;