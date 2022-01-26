import React, { useEffect, useState } from 'react';
import { ActivityIndicator,Alert,BackHandler,FlatList, Text, View } from 'react-native';
import Account from '../components/Account';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {globalStyles} from '../globals/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

let type='';
function MyAccount(props) {
  const [isLoading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [data,setData]=useState([])
  const [latitude,setLatitude]=useState(0);
  const [longitude,setLongitude]=useState(0);
  const { route,navigation } = props
  const refresh = async () => {
    setLoading(true);
    const memail = await AsyncStorage.getItem('email').then( (value) =>{
        return value;
      });
    const mtype= await AsyncStorage.getItem('type').then( (value) => {
      type=value;
      return value;
    });    
    let link="http://skylineautoservices.co/admin/skyline/api/myaccount.php";
  
  fetch(link,{
      method: 'POST',
      headers: new Headers({
                 'Content-Type': 'application/x-www-form-urlencoded',
        }),
      body: "email="+memail // <-- Post parameters
    })
    .then((response) => response.json())
    .then((json) => {setData(json);console.log(json); })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    if(mtype=='Driver'){
      let link2="http://skylineautoservices.co/admin/skyline/api/image.php";
      let body= "email="+memail;
      fetch(link2,{
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
    }
  }
  
  useEffect(() => {
    setLoading(true);
     const fetchData = async () => {
      const memail = await AsyncStorage.getItem('email').then( (value) =>{
          return value;
        });
      const mtype= await AsyncStorage.getItem('type').then( (value) => {
        type=value;
        return value;
      });    
      let link="http://skylineautoservices.co/admin/skyline/api/myaccount.php";
    
    fetch(link,{
        method: 'POST',
        headers: new Headers({
                   'Content-Type': 'application/x-www-form-urlencoded',
          }),
        body: "email="+memail // <-- Post parameters
      })
      .then((response) => response.json())
      .then((json) => {setData(json);console.log(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      if(mtype=='Driver'){
        let link2="http://skylineautoservices.co/admin/skyline/api/image.php";
        let body= "email="+memail;
        fetch(link2,{
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
      }
    }
   fetchData();
 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        <FlatList
          data={data}
          keyExtractor={({ email }, index) => email}
          renderItem={({ item }) => (
             
            <Account 
                uri={"http://skylineautoservices.co/admin/skyline/api/"+image}
                type={type}
                firstname={item.firstname} 
                lastname={item.lastname} 
                phone={item.phone}
                email={item.email} 
                street_number={item.street_number} 
                city={item.city} 
                zip_code={item.zip_code}
                state={item.state} 
             />
          )}
        />
      )}
      <TouchableOpacity 
         style={globalStyles.button}
         onPress={refresh}
         >
         <Text style={globalStyles.buttonText}>REFRESH</Text>
       </TouchableOpacity>
    </View>
  );
}
export default MyAccount;