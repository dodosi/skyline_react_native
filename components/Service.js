import React from 'react';
import {globalStyles} from '../globals/styles';
import {View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {getDataBy} from '../data/DatabaseHandler';


function book(name){
    let data={
        'service':name
    }
   
     
}
function Service(props){
    const navigation = useNavigation(); 
   
  return (
     <View style={globalStyles.ticket_row}>
      
        <TouchableOpacity 
          style={globalStyles.buttonList}
          onPress={()=>{
              book(props.name);
              navigation.navigate('Garages',{item:{service_id:props.id,service:props.name,email:props.email}});
            }
            }
            >
            <Text style={globalStyles.buttonText}>{props.name}</Text>
        </TouchableOpacity>
     </View>
  );
}
export default Service;