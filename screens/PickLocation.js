import React, { useEffect, useState } from 'react';
import { ActivityIndicator,RefreshControl, FlatList, Text,TextInput, View,Picker ,SafeAreaView,StyleSheet,TouchableOpacity} from 'react-native';
import {globalStyles} from '../globals/styles';
import { ScrollView } from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {cities,states} from '../data/Data';
import SelectBox from 'react-native-multi-selectbox';

function PickLocation(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [latitude,setLatitude]=useState(0);
  const [longitude,setLongitude]=useState(0);
  const [state,setState]=useState("");
  const [city,setCity]=useState("");
  const[streetNumber,setStreetNumber]=useState('');
  const[zipCode,setZipCode]=useState('');
  const { route,navigation } = props
  const {item}=route.params;
  const service=item.service;
  const service_id=item.service_id;
  const garageId=item.garage_id;
  const garage=item.garage;
  const email=item.email;
  const [selectedState,setSelectedState]=useState("");
  const [selectedCity,setSelectedCity]=useState("");
  function onCityChange() {
    return (val) => {
      setSelectedCity(val)
      setCity(val.item)
    }
  }
  function onStateChange() {
    return (val) => {
      //alert(val.item);
      setSelectedState(val)
      setState(val.item)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      
        {/* <Text  style={globalStyles.text}>Choose State</Text> */}
        <Text  style={globalStyles.textHome}>Fill all Information</Text>
         <SelectBox
            label="Select State"
            options={states}
            value={selectedState}
            onChange={onStateChange()}
            hideInputFilter={false}
            containerStyle={globalStyles.text}
            labelStyle={globalStyles.textlabel}
          />
           <SelectBox
              label="Select city"
              options={cities}
              value={selectedCity}
              onChange={onCityChange()}
              hideInputFilter={false}
              containerStyle={globalStyles.text}
              labelStyle={globalStyles.textlabel}
          />
        <TextInput
           style={globalStyles.textInput}
           onChangeText={(text)=>setStreetNumber(text)}
           placeholder="Enter Street Number"
          // value={item.phone}
         />
        <TextInput
           style={globalStyles.textInput}
           onChangeText={(text)=>setZipCode(text)}
           placeholder="Enter Zip code"
          // value={item.phone}
         />
         
        <TouchableOpacity 
           onPress={()=>{
             if(state==''||city==''||streetNumber==''||zipCode==''){
                alert("Please Select all required information");
             }else{
              navigation.navigate('Booking',{item:{
                  service:service,
                  service_id:service_id,
                  garage:garage,
                  garage_id:garageId,
                  state:state,
                  city:city,
                  street:streetNumber,
                  zipcode:zipCode,
                  email:email,
                 }});
         
                
              }}
        }
           style={globalStyles.button} >
           { <Text style={globalStyles.buttonText}>NEXT</Text> }
         </TouchableOpacity>
         
     </SafeAreaView>
     
  );
}
export default PickLocation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    height:5
  },
  titleText: {
    padding: 8,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});