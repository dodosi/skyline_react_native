import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View ,TouchableOpacity} from 'react-native';
import {globalStyles} from '../globals/styles';

    
function GarageServices(props) {
  const [isLoading, setLoading] = useState(true);
  const { route,navigation } = props
  const {item}=route.params;
  const service=item.service;
  const serviceId=item.service_id;
  const garageId=item.garage_id;
  const garage=item.garage;
  const email=item.email;
  const [data,setData]=useState([]);
  useEffect(() => {
   link="http://skylineautoservices.co/admin/skyline/api/garage_service_details.php";
    fetch(link,{
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/x-www-form-urlencoded',
              }),
             body: "garage_id="+garageId// <-- Post parameters
  
          })
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      
  
   
    
  }, []);
  return (
    <View style={{ flex: 1, padding: 24 }}>
        <Text style={globalStyles.textHome}>Service Details</Text>
        {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id.toString()}
              renderItem={({ item }) => (
                <View  style={globalStyles.ticket_row}>
                    <Text  style={globalStyles.text}>Make:  {item.make}</Text>
                    <Text  style={globalStyles.text}>Model: {item.model}</Text>
                    <Text  style={globalStyles.text}>Price:  ${item.price}</Text>
                </View>
                  
              )}
            />
          )}  
          <TouchableOpacity 
              style={globalStyles.button}
              onPress={()=>{
                  // navigation.navigate('Booking',{item:{service:props.service,service_id:props.service_id,garage:props.garage,garage_id:props.garage_id,email:props.email}});
                    navigation.navigate('TimeTable',{item:{service:serviceId,service_id:serviceId,garage:garage,garage_id:garageId,email:email}});
                  }
                }
                >
                <Text style={globalStyles.buttonText}>NEXT</Text>
          </TouchableOpacity>
       
    </View>
  );
}
export default GarageServices;