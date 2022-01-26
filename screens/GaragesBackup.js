import React, { useEffect, useState } from 'react';
import { ActivityIndicator,RefreshControl, FlatList, Text, View,Picker ,SafeAreaView,StyleSheet,TouchableOpacity} from 'react-native';
import Garage from '../components/Garage';
import {globalStyles} from '../globals/styles';
import Cities,{city}from '../components/Cities';
import States,{state}from '../components/States';
import Searchable from '../components/Searchable';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {cities,states} from '../data/Data'


function GaragesBackup(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [latitude,setLatitude]=useState(0);
  const [longitude,setLongitude]=useState(0);
  const [state,setState]=useState("");
  const [city,setCity]=useState("");
  const { route,navigation } = props
  const {item}=route.params;
  const service=item.service;
  const service_id=item.service_id;
  const email=item.email;
  const [serverData, setServerData] = useState([]);
  const searchGarages=(service,serviceId,state,city)=>{
    let link="http://skylineautoservices.co/admin/skyline/api/garages.php";
    //let data=[];
    console.log(state+" "+city);
    fetch(link,{
        method: 'POST',
        headers: new Headers({
                   'Content-Type': 'application/x-www-form-urlencoded',
          }),
        body: "service="+service+"&service_id="+serviceId+"&state="+state+"&city="+city // <-- Post parameters
      })
      .then((response) => response.json())
      .then((json) => {setData(json);console.log(json);})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false)});
  }
  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setLatitude( lat.toFixed(2));
        setLongitude(long.toFixed(2));
        });

        fetch('https://aboutreact.herokuapp.com/demosearchables.php')
        .then((response) => response.json())
        .then((responseJson) => {
          //Successful response from the API Call
          setServerData(responseJson.results);
        })
        .catch((error) => {
          console.error(error);
        });

        //setData(searchGarages(service,service_id,state,city));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ flex: 1, padding: 24 }}> 
   
        <Text  style={globalStyles.text}>Choose State</Text>
        <SearchableDropdown
          onTextChange={(text) =>{ setState(text);console.log(text);}}
          //On text change listner on the searchable input
          onItemSelect={(item) => {setState(item.name);}}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={globalStyles.textInput}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={states}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="Enter state"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
         <Text  style={globalStyles.text}>Choose City</Text>
         <SearchableDropdown
           onTextChange={(text) =>{ setCity(text);console.log(text);}}
           //On text change listner on the searchable input
           onItemSelect={(item) => {setCity(item.name);}}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          textInputStyle={globalStyles.textInput}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={cities}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="placeholder"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
        <TouchableOpacity 
           onPress={()=>{
             setLoading(true)
             setData(searchGarages(service,service_id,state,city));
           ;
         }}
       
           style={globalStyles.button} >
             
           { <Text style={globalStyles.buttonText}>SEARCH GARAGES</Text> }
         </TouchableOpacity>
         {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
    
        <FlatList

          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
           // <Text>{item.title}, {item.releaseYear}</Text>
            <Garage 
                id={item.id} 
                name={item.name} 
                longitude={item.longitude}
                latitude={item.latitude} 
                lat1={latitude}
                long1={longitude}
                email={email}
                service={service}
                service_id={service_id}
                garage={item.name}
                garage_id={item.id}
             />
          )}
        />
         )}
    </View>
    </SafeAreaView>
  );
}
export default Garages;
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