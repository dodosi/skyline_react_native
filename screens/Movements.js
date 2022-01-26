import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,TouchableOpacity } from 'react-native';
import {globalStyles} from '../globals/styles';
import Service from '../components/Service';

function getTotalHours(data){
  let totalHours=0;
  data.map((item)=>{
    totalHours+=Number(item.duration);
  })
  return totalHours;
 }  
 function getUnitPrice(data){
  let unitPrice=0;
  data.map((item)=>{
    unitPrice=item.unit_price;
  })
  return unitPrice;
 }  
 
function Movements(props) {
  const [isLoading, setLoading] = useState(true);
  const [totalHours,setTotalHours]=useState(0);
  const [unitPrice,setUnitPrice]=useState(0);
  const { route,navigation } = props
  const {item}=route.params;
  const service=item.service;
  const serviceId=item.service_id;
  const garageId=item.garage_id;
  const email=item.email;
  const id=item.id;
  const [data,setData]=useState([]);
  let currentTotalHours=0;

 const fetchData=async()=>{
  let link="http://skylineautoservices.co/admin/skyline/api/movementDetails.php";
  await fetch(link,{
          method: 'POST',
          headers: new Headers({
                     'Content-Type': 'application/x-www-form-urlencoded',
            }),
           body: "id="+id// <-- Post parameters

        })
        .then((response) => response.json())
        .then((json) => { setData(json); })
        .catch((error) => console.error(error))
        .finally(() => { 
          setTotalHours( getTotalHours(data));
          setUnitPrice( getUnitPrice(data));
          setLoading(false);
      }); 
      return data;   
 }


  useEffect(() => {
    fetchData();
    } , []);
  
    
  return (
    
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        <>
        <Text style={globalStyles.textHome}>Total Time:{getTotalHours(data)} Min</Text>
        <Text style={globalStyles.textHome}>Total Amount:${getTotalHours(data)*getUnitPrice(data)} </Text>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
           
           <View style={globalStyles.ticket_row}>
           <View  style={globalStyles.buttonList}>
           
             <Text  style={globalStyles.textMovement}>Started:{item.start}</Text>
             <Text  style={globalStyles.textMovement}>Ended:{item.end}</Text>
             <Text  style={globalStyles.textMovement}>Duration:{item.duration} Minute(s)</Text>
           </View>
           </View>
          )}
        />
      </>
     )}
      <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                  setLoading(true);
                  fetchData();
                }}
                >
                <Text style={globalStyles.buttonText}>REFRESH</Text>
       </TouchableOpacity>
    </View>
  );
}
export default Movements;