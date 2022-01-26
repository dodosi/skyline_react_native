import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,TouchableOpacity,ScrollView } from 'react-native';
import {globalStyles} from '../globals/styles';
import Service from '../components/Service';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Earnings(props) {
  const [isLoading, setLoading] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);
  const [totalTime,setTotalTime]=useState(0);
  const [totalEarnings,setTotalEarnings]=useState(0);
  const [data,setData]=useState([]);
  const [email,setEmail]=useState('');
  const [startDateMode, setStartDateMode] = useState('date');
  const [endDateMode, setEndDateMode] = useState('date');
  const [startDateShow, setStartDateShow] = useState(false);
  const [endDateShow, setEndDateShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sd,setSd]=useState(false);
  const [ed,setEd]=useState(false); 
  
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDateShow(Platform.OS === 'ios');
    setStartDate(currentDate);
   
  };
  const onEndDateChange= (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDateShow(Platform.OS === 'ios');
    setEndDate(currentDate);
   
  };
  const showStartDateMode = (currentMode) => {
    setStartDateShow(true);
    setStartDateMode(currentMode);
  };
  
  const showEndDateMode = (currentMode) => {
    setEndDateShow(true);
    setEndDateMode(currentMode);
  };
  const showStartDatepicker = () => {
    showStartDateMode('date');
    setSd(true);
  };

  const showEndDatepicker = () => {
    showEndDateMode('date');
    setEd(true);
  };
  const formattedStartDate=()=>startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate()>10?startDate.getDate():"0"+startDate.getDate());
  const formattedEndDate=()=>endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate()>10?endDate.getDate():"0"+endDate.getDate());
  const dformattedStartDate=()=>monthNames[(startDate.getMonth() )] + "-" + (startDate.getDate()>9?startDate.getDate():"0"+startDate.getDate())+ "-" +  startDate.getFullYear();
  const dformattedEndDate=()=>monthNames[(endDate.getMonth())] + "-" + (endDate.getDate()>9?endDate.getDate():"0"+endDate.getDate()) + "-" + endDate.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

 
 const fetchEarnings=async()=>{
    setLoading(true)
    const memail = await AsyncStorage.getItem('email').then( (value) =>{
        return value;
      });
    
    let link="http://skylineautoservices.co/admin/skyline/api/earnings.php";
    fetch(link,{
        method: 'POST',
        headers: new Headers({
                   'Content-Type': 'application/x-www-form-urlencoded',
          }),
        body: "start_date="+formattedStartDate()+"&end_date="+formattedEndDate()+"&email="+memail // <-- Post parameters
      })
      .then((response) => response.json())
      .then((json) => {
          setTotalEarnings(json.total_earning);
          setTotalTime(json.total_time);
          //console.log(JSON.stringify(json));
        })
      .catch((error) => {//console.error(error)
      })
      .finally(() => {setLoading(false)});
  }
 
 
  return (
    <ScrollView style={globalStyles.scrollContainer}>
    <View style={{ flex: 1, padding: 24 }}>
       <TouchableOpacity 
             onPress={showStartDatepicker}
             style={globalStyles.button} >
             { <Text style={globalStyles.buttonText}>Choose Starting Date</Text> }
         </TouchableOpacity>
         <Text  style={globalStyles.text}>Start: {sd?dformattedStartDate():''}</Text>
          {startDateShow && (
            <DateTimePicker
               testID="dateTimePicker"
                value={startDate}
                mode={startDateMode}
                is24Hour={false}
                display="default"
                onChange={onStartDateChange}
            />
            )}
             <TouchableOpacity 
             onPress={showEndDatepicker}
             style={globalStyles.button} >
             { <Text style={globalStyles.buttonText}>Choose Ending date</Text> }
         </TouchableOpacity>
         <Text  style={globalStyles.text}>End: {ed?dformattedEndDate():''}</Text>
      
         {endDateShow && (
            <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode={endDateMode}
                is24Hour={false}
                display="default"
                onChange={onEndDateChange}
            />
            )} 
        <TouchableOpacity 
           onPress={ ()=>{
            setLoading(true);
            fetchEarnings();
          }}
             style={globalStyles.button} >
             { <Text style={globalStyles.buttonText}>SEARCH</Text> }
         </TouchableOpacity>
      {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        <>
         <Text style={globalStyles.textHome}>Total Time (Min) : {totalTime} Minutes</Text>
         <Text style={globalStyles.textHome}>Total Earnings (USD) : {totalEarnings} USD    </Text>
        </>
     )}
     
    </View>
    </ScrollView>
  );
}
export default Earnings;