import React from 'react';
import {globalStyles} from '../globals/styles';
import {View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {getDataBy} from '../data/DatabaseHandler';
import {getDistanceFromLatLonInKm,getLocation} from '../utils/utils';

function GarageService(props){
    const navigation = useNavigation(); 
  return (
      <View style={globalStyles.ticket_row}>
         <Text  style={globalStyles.text}>{props.make}</Text>
         <Text  style={globalStyles.text}>{props.model}</Text>
         <Text  style={globalStyles.text}>{props.price}</Text>
       </View>
  );
}