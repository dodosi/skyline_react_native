import React ,  {useState } from 'react';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View,Text,Image,TextInput,TouchableOpacity,Button,StyleSheet} from 'react-native';
import {globalStyles} from '../globals/styles';
//import {ShowName, sum} from '../data/Data'
import { add, deleteData, getDataBy} from '../data/DatabaseHandler';
import Header from '../components/Header';
import { color } from 'react-native-reanimated';


function SearchTicket(props){
    const exampleImage = require('../assets/odotravel.jpeg');
    const [source,setSource]=useState();
    const [destination,setDestination]=useState();
   // const [date,setDate]=useState();
    const [isLoading, setLoading] = useState(true);
    //const [data, setData] = useState([]);
    const data={
          source:source,
          destination:destination,
          date:date}

    const {navigation}=props;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
     
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
     const formattedDate=()=>date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()>10?date.getDate():"0"+date.getDate())
    return (
        <View style={globalStyles.body}>
             
             <Image
               style={{
                alignSelf: 'stretch',
                marginLeft:"auto",
                marginRight:"auto",
                height: 200,
                width: 300,
                borderWidth: 1,
              }}
                source={exampleImage}
                resizeMode="stretch"
                
            />
            
           
            <Text style={globalStyles.text}>Enter Source</Text>
            <TextInput 
               style={globalStyles.textInput}
               onChangeText={(text)=>setSource(text)}
               />
            <Text style={globalStyles.text}>Enter Destination</Text>
            <TextInput 
              style={globalStyles.textInput}
              onChangeText={(text)=>setDestination(text)}
              
              />
            <Text style={globalStyles.text}>{formattedDate()}</Text>
            
            
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={showDatepicker}
                >
                <Text style={globalStyles.buttonText}>Choose Date</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{navigation.navigate('Tickets',
                  {item:{source:source, destination:destination,date:formattedDate()}})}}
                >
                <Text style={globalStyles.buttonText}>Search Ticket</Text>
            </TouchableOpacity>

            <View>
      </View>
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
            <TouchableOpacity 
               style={globalStyles.button}
               onPress={ ()=>{navigation.navigate('MyTicket')}}
               >
            <Text style={globalStyles.buttonText}>My Ticket</Text>
            </TouchableOpacity>
            
        </View>
    );
}
export default SearchTicket;