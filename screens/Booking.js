import React,{useEffect, useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,SafeAreaView,StyleSheet,FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import {globalStyles} from '../globals/styles';
import {registerAccount, updateAccount,createTable} from '../data/DatabaseHandler';
import { color } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {cities,states} from '../data/Data'
let mresponse='';

function Booking(props){
 
    const { route,navigation } = props
    const {item}=route.params;
    const service=item.service;
    const email=item.email;
    const garage=item.garage;
    const state=item.state;
    const city=item.city;
    const streetNumber=item.street;
    const zipCode=item.zipcode;
    const[make,setMake]=useState('');
    const[model,setModel]=useState('');
    const[plateNumber,setPlateNumber]=useState('');
    const[engineNumber,setEngineNumber]=useState('');
    const[color,setColor]=useState('');
    const[description,setDescription]=useState('');
    const[latitude,setLatitude]=useState(0);
    const[longitude,setLongitude]=useState(0);
    const [date, setDate] = useState(new Date());
    const [bookDate, setBookDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [bookMode, setBookMode] = useState('date');
    const [show, setShow] = useState(false);
    const [bookShow, setBookShow] = useState(false);
    const [bt,setBt]=useState(false);
    const [bd,setBd]=useState(false);
    const [pt,setPt]=useState(false);
    const [pd,setPd]=useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
     
    };
    const onChangeBook = (event, selectedDate) => {
      const currentDate = selectedDate || bookDate;
      setBookShow(Platform.OS === 'ios');
      setBookDate(currentDate);
     
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    const showBookMode = (currentMode) => {
      setBookShow(true);
      setBookMode(currentMode);
    };
    const showDatepicker = () => {
      showMode('date');
      setPd(true);
    };

    const showBookDatepicker = () => {
      showBookMode('date');
      setBd(true);
    };
  
    const showTimepicker = () => {
      showMode('time');
      setPt(true);
    };

    const showBookTimepicker = () => {
      showBookMode('time');
      setBt(true);
    };
    const formatAMPM=(date)=> {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
     const formattedDate=()=>date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()>9?date.getDate():"0"+date.getDate())
     //const formattedTime=()=>(date.getHours()%12>9?date.getHours()%12:"0"+date.getHours()%12)+":"+(date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes())+" "+(date.getHours()>=12?' PM':' AM');
     const formattedTime=()=>formatAMPM(date);
     const formattedBookDate=()=>bookDate.getFullYear() + "-" + (bookDate.getMonth() + 1) + "-" + (bookDate.getDate()>9?bookDate.getDate():"0"+bookDate.getDate())
    // const formattedBookTime=()=>(bookDate.getHours()%12>9?bookDate.getHours()%12:"0"+bookDate.getHours()%12)+":"+(bookDate.getMinutes()>9?bookDate.getMinutes():"0"+bookDate.getMinutes())+" "+(bookDate.getHours()>=12?' PM':' AM');
     const formattedBookTime=()=>formatAMPM(bookDate);
     const monthNames = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
   ];
   
     const dformattedDate=()=>monthNames[(date.getMonth() )] + "-" + (date.getDate()>10?date.getDate():"0"+date.getDate())+ "-" +  date.getFullYear()
     const dformattedBookDate=()=>monthNames[(bookDate.getMonth())] + "-" + (bookDate.getDate()>10?bookDate.getDate():"0"+bookDate.getDate()) + "-" + bookDate.getFullYear()
     const validateDate=(date)=>{
            var currentdate=new Date(); 
            var startHour = currentdate.getHours();
            var startMinute = currentdate.getMinutes();
            var startSecond = currentdate.getSeconds();
          
            var endHour = date.getHours();
            var endMinute = date.getMinutes();
            var endSecond = date.getSeconds();

            //Create date object and set the time to that
            var startTimeObject = new Date();
            startTimeObject.setHours(startHour, startMinute, startSecond);

            //Create date object and set the time to that
            var endTimeObject = date;
            endTimeObject.setHours(endHour, endMinute, endSecond);

            //Now we are ready to compare both the dates
            
            if(startTimeObject > endTimeObject){
              //alert('End time should be after start time.');
              return false;
            }else{
             //alert('Entries are perfect.');
             return true;
            }
      }
     const book=(service,garage,make,model,plateNumber,engineNumber,color,description,pickUpDate,pickUpTime,bookDate,bookTime,latitude,longitude,state,city,street,zipcode,email)=>{
      let params = {
      'service': service,
      'garage':garage,
      'make':make,
      'model':model,
      'plate_number': plateNumber,
      'engine_number': engineNumber,
      'car_color':color,
      'description':description,
      'pickup_date': pickUpDate,
      'pickup_time': pickUpTime,
      'book_date': bookDate,
      'book_time': bookTime,
      'latitude':latitude,
      'longitude':longitude,
      'street_number':street,
      'city':city,
      'state':state,
      'zip_code':zipcode,
      'email':email,
           
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
      fetch('http://skylineautoservices.co/admin/skyline/api/book.php',request)
      .then((response) => response.text())
      .then(response =>  mresponse=response)
      .catch((error) => console.error(error))
      .finally(() => {
          if(mresponse=='ok'){
              alert('Booked');
              navigation.navigate("Requests",{item:{email:email}})
          }else{
              alert('Booking Failed');
          }
      });

}

    //  useEffect(()=>{
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         let lat = position.coords.latitude;
    //         let long = position.coords.longitude;
    //         setLatitude( lat.toFixed(2));
    //         setLongitude(long.toFixed(2));
    //       });
    //  },[])
     
    return(
      <ScrollView>
      <View style={styles.container}>
         <Text  style={globalStyles.text}>Car Make</Text>
         <TextInput
          style={globalStyles.textInput}
          //value={item.firstname}
          onChangeText={(text)=>setMake(text)}
          placeholder="Enter Car Make"
          />
         <Text  style={globalStyles.text}>Car Model</Text>
         <TextInput
          style={globalStyles.textInput}
         // value={item.lastname}
         placeholder="Enter Car Model"
          onChangeText={(text)=>setModel(text)}
         />
         <Text  style={globalStyles.text}>Plate Number</Text>
         <TextInput
            style={globalStyles.textInput}
            //value={item.email}
            onChangeText={(text)=>setPlateNumber(text)}
            placeholder="Enter Car Plate Number"
         />
         <Text  style={globalStyles.text}>Engine Number</Text>
        <TextInput
           style={globalStyles.textInput}
           onChangeText={(text)=>setEngineNumber(text)}
           placeholder="Enter Car Plate Number"
          // value={item.phone}
         />
         <Text  style={globalStyles.text}>Car Color</Text>
         <TextInput
           style={globalStyles.textInput}
           onChangeText={(text)=>setColor(text)}
           placeholder="Enter Car Color"
          // value={item.phone}
         />
         <Text  style={globalStyles.text}>Enter Problem Description</Text>
          <TextInput
           style={globalStyles.textInput}
           onChangeText={(text)=>setDescription(text)}
           placeholder="Enter Problem Description"
          // value={item.phone}
         />
      
         <TouchableOpacity 
             onPress={showBookDatepicker}
             style={globalStyles.button} >
             { <Text style={globalStyles.buttonText}>Choose booking Date</Text> }
         </TouchableOpacity>
         <Text  style={globalStyles.text}>Booked date: {bd?dformattedBookDate():''}</Text>
          <TouchableOpacity 
            onPress={showBookTimepicker}
            style={globalStyles.button} >
            { <Text style={globalStyles.buttonText}>Choose booking Time</Text> }
         </TouchableOpacity>
         <Text  style={globalStyles.text}>Booked time: {bt?formattedBookTime():''}</Text>
       
     
         {bookShow && (
            <DateTimePicker
                testID="dateBookTimePicker"
                value={bookDate}
                mode={bookMode}
                is24Hour={false}
                display="default"
                onChange={onChangeBook}
            />
            )}
             <TouchableOpacity 
             onPress={showDatepicker}
             style={globalStyles.button} >
             { <Text style={globalStyles.buttonText}>Choose pick up date</Text> }
         </TouchableOpacity>
         <Text  style={globalStyles.text}>Pick up date: {pd?dformattedDate():''}</Text>
      
         <TouchableOpacity 
            onPress={showTimepicker}
            style={globalStyles.button} >
            { <Text style={globalStyles.buttonText}>Choose pick up time</Text> }
         </TouchableOpacity>
         <Text  style={globalStyles.text}>Pick up time: {pt?formattedTime():''}</Text>
       
         {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
            />
            )}
         <TouchableOpacity 
           onPress={()=>{
             if(validateDate(bookDate)&&validateDate(date)){
                if(make==''||model==''||plateNumber==''||engineNumber==''||color==''||description==''||bd==false||bt==false||pd==false||pt==false){
                  alert("Please fill all required information");
                }else{
                  book(service,garage,make,model,plateNumber,engineNumber,color,description,formattedDate(),formattedTime(),formattedBookDate(),formattedBookTime(),latitude,longitude,state,city,streetNumber,zipCode,email);
                  setMake('');
                  setPlateNumber('');
                  setModel('');
                  setColor('');
                  setDescription('');
                }
              }else{
                  alert("Please enter valid dates or time");
              }
            }
          }
       
           style={globalStyles.button} >
           { <Text style={globalStyles.buttonText}>SEND REQUEST</Text> }
         </TouchableOpacity>
         
         <Text ></Text>
       </View>
       </ScrollView>
    );
}
export default Booking;
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