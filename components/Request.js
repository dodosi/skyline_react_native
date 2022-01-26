import React from 'react';
import {globalStyles} from '../globals/styles';
import {View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


function book(ticketId,ticketNumber,amount){
   
    let formBody =[];
    for (let k in params) {
        let encodedKey = encodeURIComponent(k);
        let encodedValue = encodeURIComponent(params[k]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody=formBody.join("&");
    let request = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded',},
        body: formBody
    };
 
        fetch('https://odotravel.com/api/createOrder.php',request)
        //.then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error(error))
        .finally(() => console.log("DONE"));
    
   
    
}
function Request(props){
    const navigation = useNavigation(); 
  return (
     <View style={globalStyles.ticket_row}>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Service:</Text>
            <Text style={globalStyles.textvalue}>{props.service}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Pick up Address</Text>
            <Text style={globalStyles.textvalue}>
          {props.street_number+","+props.city+","+props.state+","+props.zip_code}
        </Text>
        </View>
        
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Garage Information</Text>
            <Text style={globalStyles.textvalue}>
            {props.garage+" "+props.gstreet_number+","+props.gcity+","+props.gstate+","+props.gzip_code}
            </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Pick up Date:</Text>
            <Text style={globalStyles.textvalue}>{props.pickup_date}</Text>
           
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
           <Text style={globalStyles.textlabel}>Pick up Time:</Text>
            <Text style={globalStyles.textvalue}>{props.pickup_time}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Booking date:</Text>
            <Text style={globalStyles.textvalue}>{props.book_date}</Text>
           
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
           <Text style={globalStyles.textlabel}>Booking Time:</Text>
            <Text style={globalStyles.textvalue}>{props.book_time}</Text>
        </View>
       
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={()=>{
             
              //book(props.id,props.ticket_number,(props.price+props.service_fee));
              navigation.navigate('RequestDetails',{item:{id:props.id,email:props.email,type:props.type}});
            }
        }
        >
         <Text style={globalStyles.buttonText}>View Details</Text>
        </TouchableOpacity>
     </View>
  );
}
export default Request;