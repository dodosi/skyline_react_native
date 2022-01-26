import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,TouchableOpacity } from 'react-native';
import {globalStyles} from '../globals/styles';
import Service from '../components/Service';

let  mresponse='';
function getTotal(data) {
  let total=0;
  data.map((item)=>{
    total+=Number(item.amount);
})
return total;
}
function Proforma(props) {
  const [isLoading, setLoading] = useState(true);
  const [isLoging,setLoging]=useState(false);
  const { route,navigation } = props
  const {item}=route.params;
  const id=item.id;
  const email=item.email;
  const [data,setData]=useState([]);
  const [amount,setAmount]=useState(0);
  let total=0;
  const confirmProforma=(email,id,response)=>{
    let params = {
        'id': id,
        'response':response,
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
        fetch('http://skylineautoservices.co/admin/skyline/api/confirmproforma.php',request)
        .then((response) => response.text())
        .then(response =>  mresponse=response)
        .catch((error) => console.error(error))
        .finally(() => {
            setLoging(false);
            if(mresponse=='ok'){
                if(response==7 && amount>0){
                  navigation.navigate('Pay', {item:{id:id, amount:amount}});
                }
                alert('Success');
            }else{
                alert('Try Again!!');
            }
        });
}    

  const fetchData=()=>{
    link="http://skylineautoservices.co/admin/skyline/api/proforma.php";
    fetch(link,{
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/x-www-form-urlencoded',
              }),
             body: "id="+id// <-- Post parameters
  
          })
          .then((response) => response.json())
          .then((json) => {
            setData(json)
            data.map((item)=>{
                total+=Number(item.amount);
                setAmount(total);
            })
          }
           
            )
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
   }
  useEffect(() => {
    fetchData();
  }, [data]);
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator  size="large" color="#00ff00" /> : (
        <>
        <Text style={globalStyles.textHome}>Total Amount:{getTotal(data)}</Text>
        {isLoging?<ActivityIndicator size="large"color="#00ff00" /> :(
          <></>
        )}
        <TouchableOpacity 
           style={globalStyles.button}
           onPress={()=>{
                setLoging(true);
                if(getTotal(data)>0){
                  confirmProforma(email,id,"7");  
                }
                else{
                  alert("Assessment not yet done, try again later")
                }
              }
            }
            >
            <Text style={globalStyles.buttonText}>CONFIRM</Text>
     </TouchableOpacity>
     <TouchableOpacity 
           style={globalStyles.button}
           onPress={()=>{
                setLoging(true);
                if(getTotal(data)>0){
                  confirmProforma(email,id,"8"); 
                }else{
                  alert("Assessment not yet done, try again later")
                }
              }
            }
            >
            <Text style={globalStyles.buttonText}>REJECT</Text>
      </TouchableOpacity>
      <Text style={globalStyles.text}>Proforma Details</Text>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) =>{if(id){return id.toString()} } }
          renderItem={({ item }) => (
            <View style={globalStyles.ticket_row}>
              <View  style={globalStyles.buttonList}>
                 <Text  style={globalStyles.text}>{item.title}</Text>
                 <Text  style={globalStyles.text}>{item.amount}</Text>
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
export default Proforma;