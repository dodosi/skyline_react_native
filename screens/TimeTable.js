import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,TouchableOpacity } from 'react-native';
import {globalStyles} from '../globals/styles';
    
function TimeTable(props) {
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
   link="http://skylineautoservices.co/admin/skyline/api/timetable.php";
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
        <Text style={globalStyles.textHome}>Working Days</Text>
        {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        <View>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
           <View style={globalStyles.ticket_row}>
                <Text  style={globalStyles.textlabel}>{item.day}</Text>
                <Text  style={globalStyles.text}>{item.start}-{item.end}</Text>
           </View>
          )}
        />
    </View>
    
        )}
        <TouchableOpacity 
           style={globalStyles.button}
           onPress={()=>{
               navigation.navigate('PickLocation',{item:{service:service,service_id:serviceId,garage:garage,garage_id:garageId,email:email}});
                }
              }
             >
            <Text style={globalStyles.buttonText}>NEXT</Text>
         </TouchableOpacity>
    </View>
  );
}
export default TimeTable;