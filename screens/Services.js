import React, { useEffect, useState } from 'react';
import { ActivityIndicator,TouchableOpacity, FlatList, Text, View,BackHandler, Alert  } from 'react-native';
import {globalStyles} from '../globals/styles';
import Service from '../components/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';

    
function Services(props) {
  const [isLoading, setLoading] = useState(true);
  const [myEmail, setEmail] = useState('');
  const { route,navigation } = props
  const {item}=route.params;
  const email=item.email;
  const [services,setData]=useState([]);

  const fetchData=()=>{
    link="http://skylineautoservices.co/admin/skyline/api/services.php";
    fetch(link,{
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/x-www-form-urlencoded',
              }),
            body: "email="+email // <-- Post parameters
          })
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
  }

 const localData = async () => {
      const memail = await AsyncStorage.getItem('email').then( (value) =>{
             return value;
        });
      const mtype= await AsyncStorage.getItem('type').then( (value) => {
             return value;
      });    
      console.log(memail);
      setEmail(memail);
  }
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () =>{
          //BackHandler.exitApp()
          navigation.navigate('Home');
       }  }
    ]);
    return true;
  };
  
  useEffect(() => {
      fetchData();
      localData();
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>BackHandler.removeEventListener("hardwareBackPress", backAction);
  
   }, []);
  return (
    <View style={{ flex: 1, padding: 24 }}>
        <Text style={globalStyles.textHome}>Services</Text>
        {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
             
            
        <FlatList
          data={services}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
         
            <Service 
            id={item.id} 
            name={item.name} 
            email={myEmail}
             />
          )}
        />
        )}
         <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                 setLoading(true)
                 fetchData()
                }}
                >
                <Text style={globalStyles.buttonText}>REFRESH</Text>
       </TouchableOpacity>
    </View>
  );
}
export default Services;