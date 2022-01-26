import React from 'react';
import {globalStyles} from '../globals/styles';
import {View,Text, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {getDataBy} from '../data/DatabaseHandler';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import Expo from 'expo';


function RequestDetail(props){
  const navigation = useNavigation(); 
  const[isLoading,setLoading]=useState(false);
  const color=(status)=>{
   
    if(status==1||status==8||status==10){
      return  'red';
    }
    if(status==2||status==3||status==4||status==5||status==6||status==7){
      return 'yellow';
    }
    if(status==9){
      return 'green';
    }
    }
  const status=(status)=>{
    if(status==1){
      return 'Pending, you will be notified as soon as possible';
     }
        
    else if(status==2){
        return 'Accepted';
    }
    else if(status==3){
        return 'Picked';
    }
    else if(status==4){
      return 'Assigned to technician';
    }
    else if(status==5){
      return 'Assessed';
    }
    else if(status==6){
      return 'Proforma Sent';
    }
    else if(status==7){
      return 'Proforma Accepted';
    }
    else if(status==8){
      return 'Proforma Rejected';
    }
    else if(status==9){
      return 'Completed';
    }
    else if(status==10){
      return 'Cancelled';
    }
    else{
        return ''
    }
  }
  const sendWhatsappMessage=(message,phone)=> {
    if (cellNumber.length != 10) {
      Alert.alert('Please Enter Correct WhatsApp Number');
      return;
    }
    // Here we are using 91 which is India Country Code.
    // You can change country code.
    let URL = 'whatsapp://send?text=' +  message + '&phone=' + phone;

    Linking.openURL(URL)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Alert.alert('Make sure Whatsapp installed on your device');
      });
  };

  // const checkSMS = async (phone) => {
  //   const { status } = await Permissions.askAsync(Permissions.SMS);
  //   const isAvailable = await Expo.SMS.isAvailableAsync();
  //   if (isAvailable) {
  //     const { result } = await Expo.SMS.sendSMSAsync(props.phone, 'Dear esteemed customer, I am coming to pick up your car');
  //   }
  // }
  // const sendMessage =async()=>SMS.sendSMSAsync(
  //   [props.phone],
  //   'Dear esteemed customer, I am coming to pick up your car',
  // );

const pick=(id,email,phone,state,city,street,zipcode)=>{
    let mresponse='';
    let params = {
     'id': id,
     'email':email
     };  
     let formBody =[];
     for (let k in params) {
         let encodedKey = encodeURIComponent(k);
         let encodedValue = encodeURIComponent(params[k]);
         formBody.push(encodedKey + "=" + encodedValue);
     }
     formBody=formBody.join("&");
     let request = {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: formBody
     };
     console.log(JSON.stringify(request));
     fetch('http://skylineautoservices.co/admin/skyline/api/pick.php',request)
     .then((response) => response.text())
     .then(response =>  mresponse=response)
     .catch((error) => console.error(error))
     .finally(() =>{ console.log(mresponse);
        setLoading(false);
        if(mresponse=='ok'|| mresponse.includes("}ok")){
          alert("You have successfully picked customer !!");
          let address=street+","+city+","+state+","+zipcode;
          //sendWhatsappMessage("Dear Customer, I am coming to pick your car",phone);
          // sendMessage();
          Linking.openURL("https://www.google.com/maps?q="+address);
        }else if(mresponse=='Picked'){
           alert("Customer was already picked!!");
        }else{
         alert("Try again!!!!");
     }});
  
  }
  const move=(id,email,action)=>{
    let mresponse='';
    let params = {
     'id': id,
     'email':email,
     'action':action
     };  
      
     let formBody =[];
     for (let k in params) {
         let encodedKey = encodeURIComponent(k);
         let encodedValue = encodeURIComponent(params[k]);
         formBody.push(encodedKey + "=" + encodedValue);
     }
     formBody=formBody.join("&");
     let request = {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: formBody
     };
     console.log(JSON.stringify(request));
     fetch('http://skylineautoservices.co/admin/skyline/api/move2.php',request)
     .then((response) => response.text())
     .then(response =>  mresponse=response)
     .catch((error) => console.error(error))
     .finally(() =>{ console.log(mresponse);
        setLoading(false);
        if(mresponse=='ok'){
          alert("Saved!!");
          //Linking.openURL('http://maps.google.com/maps?daddr=kigali');
           //Linking.openURL(googleMapOpenUrl({ latitude: 23.235899, longitude: 78.323258 }));
        }else{
         alert("Try again!!!!");
     }});
  
  }
const cancelRequest=(id,email)=>{
    let mresponse='';
    let params = {
     'id': id,
     'email':email,
     };  
      
     let formBody =[];
     for (let k in params) {
         let encodedKey = encodeURIComponent(k);
         let encodedValue = encodeURIComponent(params[k]);
         formBody.push(encodedKey + "=" + encodedValue);
     }
     formBody=formBody.join("&");
     let request = {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: formBody
     };
     console.log(JSON.stringify(request));
     fetch('http://skylineautoservices.co/admin/skyline/api/cancelrequest.php',request)
     .then((response) => response.text())
     .then(response =>  mresponse=response)
     .catch((error) => console.error(error))
     .finally(() =>{ console.log(mresponse);
        setLoading(false);
        if(mresponse=='ok'){
         alert("Request Cancelled");
     }else{
        alert("Try again!!!!");
     }});
  
  } 
  return (
     <View style={globalStyles.ticket_row}>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Make:</Text>
            <Text style={globalStyles.textvalue}>{props.make}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Model</Text>
            <Text style={globalStyles.textvalue}>{props.model}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Color</Text>
            <Text style={globalStyles.textvalue}>{props.color}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Plate Number</Text>
            <Text style={globalStyles.textvalue}>{props.plate_number}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Engine Number</Text>
            <Text style={globalStyles.textvalue}>{props.engine_number}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Description</Text>
            <Text style={globalStyles.textvalue}>{props.description}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Pick-up Info:</Text>
            <Text style={globalStyles.textvalue}>{props.pickup_date+" "+props.pickup_time}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Booking Info:</Text>
            <Text style={globalStyles.textvalue}>{props.book_date+" "+props.book_time}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
           <Text style={globalStyles.textlabel}>Comment:</Text>
            <Text style={globalStyles.textvalue}>{props.comment}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
           <Text style={globalStyles.textlabel}>Status:</Text>
           <Text style={globalStyles.textvalue, {backgroundColor:color(props.status),flex: 1, flexWrap: 'wrap'}}>
             {status(props.status)}
           </Text>
        </View>
       {(props.type=='Driver')?
            <View>
              {
                isLoading?<ActivityIndicator size="large" color="#00ff00"/>:<></>
              }
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={()=>{
                    setLoading(true);
                    pick(props.id,props.email,props.phone,props.state,props.city,props.street,props.zipcode);
                    
                }}
              >
              <Text style={globalStyles.buttonText}>PICK</Text>
           </TouchableOpacity>
           <TouchableOpacity 
                style={globalStyles.button}
                onPress={()=>{
                    setLoading(true);
                    move(props.id,props.email,"START");
                 }}
              >
              <Text style={globalStyles.buttonText}>MOVE</Text>
           </TouchableOpacity>
           <TouchableOpacity 
                style={globalStyles.button}
                onPress={()=>{
                    setLoading(true); 
                    move(props.id,props.email,"STOP");
                 }}
              >
              <Text style={globalStyles.buttonText}>STOP</Text>
           </TouchableOpacity>
           <TouchableOpacity 
              style={globalStyles.button}
                onPress={()=>{
                
                navigation.navigate('Movements',{item:{id:props.id,email:props.email}});
              }
            }>
           <Text style={globalStyles.buttonText}>Movements</Text>
         </TouchableOpacity>
           </View>
       :
       <>
       
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={()=>{
              navigation.navigate('DriverDetails',{item:{id:props.id,email:props.email}});
            }
        }
        >
        <Text style={globalStyles.buttonText}>View Driver</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={globalStyles.button}
          onPress={()=>{
            navigation.navigate('Movements',{item:{id:props.id,email:props.email}});
            }
          }>
         <Text style={globalStyles.buttonText}>Movements</Text>
         </TouchableOpacity>
         
         <TouchableOpacity 
          style={globalStyles.button}
          onPress={()=>{
               navigation.navigate('Payment',{item:{id:props.id,email:props.email}});
            }
        }
        >
         <Text style={globalStyles.buttonText}>Go to payment</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={globalStyles.button}
          onPress={()=>{
               navigation.navigate('Rate',{item:{id:props.id}});
            }
        }
        >
         <Text style={globalStyles.buttonText}>Rate Driver</Text>
        </TouchableOpacity>
       
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={()=>{
              cancelRequest(props.id,props.email);
           
            }
          }>
         <Text style={globalStyles.buttonText}>Cancel Request</Text>
        </TouchableOpacity>
        </>
      }
     </View>
  );
}
export default RequestDetail;