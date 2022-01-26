import React from 'react';
import {globalStyles} from '../globals/styles';
import {View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {getDataBy} from '../data/DatabaseHandler';


function book(ticketId,ticketNumber,amount){
    let mdata=getDataBy(2);
    let params = {
            'firstname': mdata.firstname,
            'lastname': mdata.lastname,
            'phone':mdata.phone,
            'ticketId':ticketId,
            'ticketNumber':ticketNumber,
            'amount':amount          
    };
    //console.log(params);
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
    if(mdata==undefined){
       alert("Create Account!!!!");
    }else{
        fetch('https://odotravel.com/api/createOrder.php',request)
        //.then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error(error))
        .finally(() => console.log("DONE"));
    }
   
    
}
function Ticket(props){
    const navigation = useNavigation(); 
   
  return (
     <View style={globalStyles.ticket_row}>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Ticket Id:</Text>
            <Text style={globalStyles.textvalue}>{props.id}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Agency</Text>
            <Text style={globalStyles.textvalue}>{props.agency}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={globalStyles.textlabel}>Journey:</Text>   
        <Text style={globalStyles.textvalue}>{props.journey}</Text>
          
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={globalStyles.textlabel}>Price:</Text>
        <Text style={globalStyles.textvalue}>{props.price}</Text>
           
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={globalStyles.textlabel}>Service Fee:</Text>
        <Text style={globalStyles.textvalue}>{props.service_fee}</Text> 
         </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Date:</Text>
            <Text style={globalStyles.textvalue}>{props.date}</Text>
           
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
           <Text style={globalStyles.textlabel}>Time:</Text>
            <Text style={globalStyles.textvalue}>{props.time}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Tickets Left:</Text>
            <Text style={globalStyles.textvalue}>{props.ticket_number}</Text>
        </View>
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={()=>{
              book(props.id,props.ticket_number,(props.price+props.service_fee));
              navigation.navigate('SearchTicket');
            }
            }
        >
            <Text style={globalStyles.buttonText}>Book Now</Text>
        </TouchableOpacity>
     </View>
  );
}
export default Ticket;