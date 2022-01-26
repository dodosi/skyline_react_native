import React,{useEffect,useState} from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import {globalStyles} from '../globals/styles';
import { Appbar } from 'react-native-paper';
import MyHeader from '../components/Header';
import {getDataBy} from '../data/DatabaseHandler';
import QRCode from 'react-native-qrcode-svg';

function MyTicket(props) {
  const {navigation}=props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let mdata=getDataBy(2);
  useEffect(()=>{
  
    let link="https://odotravel.com/api/myTicket.php";
    if(mdata==undefined){
      alert("Create Account!!!!");
    }else{
      fetch(link,{
        method: 'POST',
        headers: new Headers({
                   'Content-Type': 'application/x-www-form-urlencoded',
          }),
        body: "phone="+mdata.phone // <-- Post parameters
      })
      .then((response) => response.json())
      .then((json) => {setData(json[0]);console.log(json[0])})
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }
    
  }, []);
  
    let content="Names/: "+ data.firstname +" " +data.lastname+
    "Phone: "+ data.phone+
    "Agency: "+data.agency+
    "Journey: "+data.journey+
    "Date:"+data.date+
    "Time: "+data.time+
    "Price "+data.price;

  return (
    
    
    <View style={globalStyles.ticket_row}>
       
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={globalStyles.textlabel}>Phone</Text>
            <Text style={globalStyles.textvalue}>{data.phone}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={globalStyles.textlabel}>Agency:</Text>   
          <Text style={globalStyles.textvalue}>{data.agency}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={globalStyles.textlabel}>Journey:</Text>   
          <Text style={globalStyles.textvalue}>{data.journey}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={globalStyles.textlabel}>Date:</Text>   
          <Text style={globalStyles.textvalue}>{data.date+' '+data.time}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={globalStyles.textlabel}>Price:</Text>
          <Text style={globalStyles.textvalue}>{data.price}</Text>
         </View>
       
      
        <View style={{flex: 1, flexDirection: 'column',alignContent:'center'}}>
            <Text style={globalStyles.textvalue}>{data.names}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column',alignContent:'center'}}>
        <View style={globalStyles.qr} >
          {data!=undefined?(
          <QRCode
              
              value={content}
              //Setting the value of QRCode
              size={250}
              
              //Size of QRCode
              bgColor="#000"
              //Backgroun Color of QRCode
              fgColor="#fff"
              //Front Color of QRCode
            />
          ):null}
         </View>
        </View>
        
    </View>
  );
}
export default MyTicket;