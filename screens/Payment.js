import React ,  {useState } from 'react';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View,Text,Image,TextInput,TouchableOpacity,Button,StyleSheet} from 'react-native';
import {globalStyles} from '../globals/styles';
import {useEffect} from 'react';
import PayPal from '../components/PayPal';
//import {ShowName, sum} from '../data/Data'
import { add, deleteData, getDataBy} from '../data/DatabaseHandler';
import Header from '../components/Header';
import { color } from 'react-native-reanimated';

let mresponse='';
function Payment(props){
    const exampleImage = require('../assets/skyline.jpg');
    const [price,setPrice]=useState([]);
    const { route,navigation } = props
    const {item}=route.params;
    const id=item.id;
    const email=item.email;
    const garage_id=item.garage_id;
    useEffect(() => {
      /// let link="https://odotravel.com/api/tickets.php?source=musanze&destination=nyabugogo&date=2020-11-07";
       let link="http://skylineautoservices.co/admin/skyline/api/payment.php";
     
       fetch(link,{
           method: 'POST',
           headers: new Headers({
                      'Content-Type': 'application/x-www-form-urlencoded',
             }),
           body: "id="+id // <-- Post parameters
         })
         .then((response) => response.json())
         .then((json) => {
               setPrice(json);
               })
         .catch((error) => console.error(error))
         .finally(() => {

         });
     }, []);
    return (
        <View style={globalStyles.body}>
             
             <Image
               style={{
                alignSelf: 'stretch',
                marginLeft:"auto",
                marginRight:"auto",
                height: 200,
                width: 300,
                borderWidth: 1,
              }}
                source={exampleImage}
                resizeMode="stretch"
                
            />
            
           
            <Text style={globalStyles.text}>Amount to pay</Text>
            <Text style={globalStyles.text}>${price.length>0?price[0].amount:0}</Text>
            {/* <PayPal
              amount={20}//i.e $20 
              orderID={'jkhkjfhsadkjfhdsjkf'} //transactionID
              ProductionClientID={'AU3a4o9TOYKfckztceiiGJR7CH5puHTU_G1hZQbKorCkX3XJQv1IySsTtp9LoUU4bFtkEE1cBld3yR9m'}
              success={(a)=>{
                    //callback after payment has been successfully compleated
                    console.log(a)
                 }
               } 
              failed={(a)=>{
                    //callback if payment is failed
              }}
            /> */}
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                   let amount=price.length>0?price[0].amount:0;
                   if(amount>0){
                    navigation.navigate('Pay', {item:{id:id, amount:amount}});
                   }else{
                     alert("Wait for the proforma");
                   }
                  
                 }}
                >
                <Text style={globalStyles.buttonText}>Click to confirm Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                    
                      navigation.navigate('Proforma', {item:{id:id,email:email,garage_id:garage_id}});
                 }}
                >
                <Text style={globalStyles.buttonText}>View Proforma</Text>
            </TouchableOpacity>
            <View>
      </View>
       </View>
    );
}
export default Payment;