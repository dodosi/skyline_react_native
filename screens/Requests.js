import React, { useEffect, useState } from 'react';
import { ActivityIndicator,TouchableOpacity, FlatList, Text, View,BackHandler, Alert  } from 'react-native';
import Request from '../components/Request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyles} from '../globals/styles';

function Requests(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [type,setType]=useState('');
  const [email,setEmail]=useState('');
  const { route,navigation } = props
  const {item}=route.params;
  
  const fetchData = async () => {
    const memail = await AsyncStorage.getItem('email').then( (value) =>{
      setEmail(value); 
      return value;
      });
    const mtype= await AsyncStorage.getItem('type').then( (value) => {
      setType(value);
      return value;
    });    
   
    if(memail!='NA'){
      let link="http://skylineautoservices.co/admin/skyline/api/bookinglist.php";
      if(mtype=='Driver'){
        link="http://skylineautoservices.co/admin/skyline/api/pickuphistory.php";
      }
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
    }else{
      navigation.navigate('CustomerLogin');
    }
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
    //BackHandler.addEventListener("hardwareBackPress", backAction);
     fetchData();
    // return () =>
    // BackHandler.removeEventListener("hardwareBackPress", backAction);
   
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
       <Text style={globalStyles.textHome}>Requests</Text>
      {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id!=null?id.toString():1}
          renderItem={({ item }) => (
           // <Text>{item.title}, {item.releaseYear}</Text>
            <Request 
                id={item.id} 
                service={item.service} 
                garage={item.garage}
                gstreet_number={item.garage_street_number}
                gstate={item.garage_state}
                gcity={item.garage_city}
                gzip_code={item.garage_zipcode}
                pickup_date={item.pick_up_date} 
                pickup_time={item.pick_up_time} 
                book_date={item.book_date} 
                book_time={item.book_time} 
                city={item.city}
                street_number={item.street_number}
                state={item.state}
                zip_code={item.zip_code}
                type={type} 
                email={email}
               
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
export default Requests;