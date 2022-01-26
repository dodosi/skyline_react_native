import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,Alert,BackHandler } from 'react-native';
import PendingRequest from '../components/PendingRequest';
import Request from '../components/Request';

function PendingRequests(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [latitude,setLatitude]=useState(0);
  const [longitude,setLongitude]=useState(0);
  const { route,navigation } = props
  //alert(date);
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
    BackHandler.addEventListener("hardwareBackPress", backAction);
    
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   let lat = position.coords.latitude;
    //   let long = position.coords.longitude;
    //   setLatitude( lat.toFixed(2));
    //   setLongitude(long.toFixed(2));
    //   });
      
      let link="http://skylineautoservices.co/admin/skyline/api/pendingrequests.php";
  
    fetch(link,{
        method: 'POST',
        headers: new Headers({
                   'Content-Type': 'application/x-www-form-urlencoded',
          }),
        body: "email="+email // <-- Post parameters
      })
      .then((response) => response.json())
      .then((json) => {setData(json);console.log(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      return()=> BackHandler.removeEventListener("hardwareBackPress", backAction);

  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
           // <Text>{item.title}, {item.releaseYear}</Text>
            <PendingRequest
                id={item.id} 
                firstname={item.customer_firstname}
                lastname={item.customer_lastname}
                cstate={item.customer_state}
                ccity={item.customer_city}
                cstreet_number={item.customer_street_number}
                czip_code={item.customer_zipcode}
                garage={item.garage_name}
                gstreet_number={item.garage_street_number}
                gstate={item.garage_state}
                gcity={item.garage_city}
                gzip_code={item.garage_zipcode}
                date={item.pick_up_date} 
                time={item.pick_up_time} 
                longitude={item.longitude}
                latitude={item.latitude}
                email={email} 
                lat1={latitude}
                long1={longitude}
            />
          )}
        />
      )}
    </View>
  );
}
export default PendingRequests;