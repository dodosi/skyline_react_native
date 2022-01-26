//https://expo.io/notifications
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import PhoneInput from 'react-phone-number-input';
import { globalStyles } from '../globals/styles';

export default function NotificationPage(props) {
  const { route,navigation } = props
  const {item}=route.params;
  const title =item.title;
  const message=item.message;
  const [notification, setNotification] = useState(item.notification);

   
  return (
    <View  style={{ flex:1,
      padding:20,
      backgroundColor:'#ffffff',
      justifyContent: 'center',}}>
      
        <Text style={globalStyles.textlabel}>{title} </Text>
        <Text style={globalStyles.text}>{message}</Text>
    
     
      
    </View>
  );
}
