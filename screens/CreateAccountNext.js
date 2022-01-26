import React, { useEffect, useState } from 'react';
import { ActivityIndicator,RefreshControl, FlatList, Text,TextInput, View,Picker ,SafeAreaView,StyleSheet,TouchableOpacity} from 'react-native';
import {globalStyles} from '../globals/styles';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {cities,states} from '../data/Data';
import SelectBox from 'react-native-multi-selectbox';

let mresponse='';
function CreateAccountNext(props) {
  const [isLoading, setLoading] = useState(true);
  const [isLoging, setLoging] = useState(false);
  const [data, setData] = useState([]);
  const [latitude,setLatitude]=useState(0);
  const [longitude,setLongitude]=useState(0);
  const [state,setState]=useState("");
  const [city,setCity]=useState("");
  const[streetNumber,setStreetNumber]=useState('');
  const[zipCode,setZipCode]=useState('');
  const { route,navigation } = props
  const {item}=route.params;
  const firstName=item.firstName;
  const lastName=item.lastName;
  const email=item.email;
  const phone=item.phone;
  const type=item.type;
  const token=item.token;
  const password=item.password;
  const [selectedState,setSelectedState]=useState("");
  const [selectedCity,setSelectedCity]=useState("");

  function onCityChange() {
    return (val) => {
     // alert(val.item);
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
  const registerAccount=(firstName,lastName,phone,email,street,city,state,zipCode,token,password,type)=>{
    let params = {
     'firstname': firstName,
     'lastname': lastName,
     'phone':phone,
     'email':email,
     'street_number':street,
     'city':city,
     'state':state,
     'zip_code':zipCode,
     'type':type,
     'token':token,
     'password':password,         
     };  
      
     let formBody =[];
     for (let k in params) {
         let encodedKey = encodeURIComponent(k);
         let encodedValue = encodeURIComponent(params[k]);
         formBody.push(encodedKey + "=" + encodedValue);
     }
     formBody=formBody.join("&");
     let request = {
         method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         body: formBody
     };
     console.log(JSON.stringify(request));
     fetch('http://skylineautoservices.co/admin/skyline/api/register2.php',request)
     .then((response) => response.text())
     .then(response => {
        mresponse=response;
        if(mresponse=='ok'){ 
          alert("Account Created!!"); 
          navigation.navigate('Tab');
        }else if(mresponse=='booked'){
          alert("This account is already booked!!"); 
        }else{
          alert("Please try again!!");
        }} )
     .catch((error) => console.error(error))
     .finally(() =>{  console.log(mresponse);setLoging(false)});


}

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ flex: 1, padding: 24 }}> 
   
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
         {/* <Text  style={globalStyles.text}>Enter Street Number</Text> */}
        <TextInput
           style={globalStyles.textInput}
           onChangeText={(text)=>setStreetNumber(text)}
           placeholder="Enter Street Number"
          // value={item.phone}
         />
         {/* <Text  style={globalStyles.text}>Enter Zip Code</Text> */}
 
        <TextInput
           style={globalStyles.textInput}
           onChangeText={(text)=>setZipCode(text)}
           placeholder="Enter Zip code"
          // value={item.phone}
         />
          {isLoging ? <ActivityIndicator  size="large" color="#00ff00" /> : (
              <></>
             )}
        <TouchableOpacity 
           onPress={ ()=>{
                if(state==''||city==''|| streetNumber==''|| zipCode==''){
                  alert("Please fill all required information");
                }else{
                  setLoging(true);
                  registerAccount(firstName,lastName,phone,email,streetNumber,city,state,zipCode,token,password,type)
                }
               }
            } 
           style={globalStyles.button} >
           { <Text style={globalStyles.buttonText}>REGISTER</Text> }
         </TouchableOpacity>
       
    </View>
    </SafeAreaView>
  );
}
export default CreateAccountNext;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});