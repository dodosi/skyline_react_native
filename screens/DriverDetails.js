import React from 'react';
import {globalStyles} from '../globals/styles';
import {View,Image,Text,ActivityIndicator,FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {getDataBy} from '../data/DatabaseHandler';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import { useEffect } from 'react';
function firstname(data){
   return data[0].firstname+" "+data[0].lastname;
}
function phone(data){
  return data[0].phone;
}
function DriverDetails(props){
  const[image,setImage]=useState('');
  const[isLoading,setLoading]=useState(false);
  const { route,navigation } = props
  const {item}=route.params;
  const id=item.id;
  const email=item.email;
  const [data,setData]=useState([]);
  const fetchData = () => {
    let link="http://skylineautoservices.co/admin/skyline/api/driverdetails.php";
    fetch(link,{
      method: 'POST',
      headers: new Headers({
                 'Content-Type': 'application/x-www-form-urlencoded',
        }),
      body: "id="+id // <-- Post parameters
    })
    .then((response) => response.json())
    .then((json) => {
             setData(json);
             console.log(json)
            })
    .catch((error) => console.error(error))
    .finally(() => {
      setLoading(false)
      console.log(data)
    });
    
  }
  useEffect(() => {
    fetchData();
     let link="http://skylineautoservices.co/admin/skyline/api/image.php";
    let body= "id="+id;
   
    fetch(link,{
        method: 'POST',
        headers: new Headers({
                   'Content-Type': 'application/x-www-form-urlencoded',
          }),
        body: body// <-- Post parameters
      })
      .then((response) => response.text())
      .then(response =>  setImage(response))
      .then((json) => console.log(json))
      .catch((error) => console.error(error))
      .finally(() =>{});
      
     }, []);
  return (
     <View >
       {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
         <View>  
         <Image
                source={{
                  uri:
                  'http://skylineautoservices.co/admin/skyline/api/'+image,
                }}
                style={{
                    alignSelf: 'stretch',
                    marginLeft:"auto",
                    marginRight:"auto",
                    height: 300,
                    width: 300,
                    borderWidth: 0,
                  }}
                  resizeMode="stretch"
          />
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View  style={globalStyles.ticket_row}>
                    <Text  style={globalStyles.text}>Names: {item.firstname} {item.lastname}</Text>
                    <Text  style={globalStyles.text}>Phone: {item.phone}</Text>
                </View>
                  
              )}
            />
          </View>
          )} 
     </View>
  );
}
export default DriverDetails;