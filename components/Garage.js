import React from 'react';
import {globalStyles} from '../globals/styles';
import {View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {getDataBy} from '../data/DatabaseHandler';
import {getDistanceFromLatLonInKm,getLocation} from '../utils/utils';

function Garage(props){
    const navigation = useNavigation(); 
  return (
     <View style={globalStyles.ticket_row}>
          <TouchableOpacity 
           style={globalStyles.buttonList}
           onPress={()=>{
               // navigation.navigate('Booking',{item:{service:props.service,service_id:props.service_id,garage:props.garage,garage_id:props.garage_id,email:props.email}});
                navigation.navigate('GarageServices',{item:{service:props.service,service_id:props.service_id,garage:props.garage,garage_id:props.garage_id,email:props.email}});
             }
            }
            >
            <Text style={globalStyles.buttonText}>{props.name}</Text>
            <Text style={globalStyles.buttonText}>{getDistanceFromLatLonInKm(props.lat1,props.long1,props.latitude,props.longitude)}</Text>
        </TouchableOpacity>
     </View>
  );
}

export default Garage;