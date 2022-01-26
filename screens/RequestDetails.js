import React, { useEffect, useState } from 'react';
import { ActivityIndicator,TouchableOpacity, FlatList, Text, View } from 'react-native';
import RequestDetail from '../components/RequestDetail';
import {globalStyles} from '../globals/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RequestDetails(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email,setEmail]=useState('');
  const { route,navigation } = props
  const {item}=route.params;
  const id=item.id;
  //const email=item.email;
  const type=item.type;
 
  const fetchMail = async () => {
    const memail = await AsyncStorage.getItem('email').then( (value) =>{
       setEmail(value); 
      return value;
      });
    }

  const fetchData=()=>{
     /// let link="https://odotravel.com/api/tickets.php?source=musanze&destination=nyabugogo&date=2020-11-07";
     let link="http://skylineautoservices.co/admin/skyline/api/bookinglist.php";
  
     fetch(link,{
         method: 'POST',
         headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
           }),
         body: "id="+id // <-- Post parameters
       })
       .then((response) => response.json())
       .then((json) => {setData(json);console.log(json)})
       .catch((error) => console.error(error))
       .finally(() => setLoading(false));
  }
  useEffect(() => {
     fetchMail();
     fetchData();
     //alert(email);
  }, []);

  return (
    <View style={{ flex: 1, padding: 8 }}>
      {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
           // <Text>{item.title}, {item.releaseYear}</Text>
            <RequestDetail 
                id={item.id} 
                make={item.make} 
                model={item.model}
                plate_number={item.plate_number}
                engine_number={item.engine_number}
                color={item.car_color}
                description={item.description}
                pickup_date={item.pick_up_date} 
                pickup_time={item.pick_up_time} 
                book_date={item.book_date} 
                book_time={item.book_time} 
                comment={item.comment} 
                status={item.status}
                latitude={item.latitude}
                longitude={item.longitude}
                phone={item.phone}
                token={item.token}
                email={email}
                type={type}
                state={item.state}
                street={item.city}
                city={item.street_number}
                zipcode={item.zip_code}

            />
          )}
        />
      )}
      <View style={{flexDirection:'row',alignSelf:'stretch', justifyContent: 'center',}}>
      <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                  navigation.navigate("Home");
                }}
                >
                <Text style={globalStyles.buttonText}>Return Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                  setLoading(true)
                  fetchData()
                }}
                >
                <Text style={globalStyles.buttonText}>Check Updates</Text>
        </TouchableOpacity>
       </View>
    </View>
  );
}
export default RequestDetails;