import React ,  {useState } from 'react';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ActivityIndicator,View,Text,Image,TextInput,TouchableOpacity,Button,StyleSheet} from 'react-native';
import {globalStyles} from '../globals/styles';
//import {ShowName, sum} from '../data/Data'
import { add, deleteData, getDataBy} from '../data/DatabaseHandler';
import Header from '../components/Header';
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';


function Rate(props){
  const exampleImage = require('../assets/skyline.jpg');
    const [rate,setRate]=useState();
    const [review,setReview]=useState();
    const [isLoading, setLoading] = useState(false);
    const { route,navigation } = props
    const {item}=route.params;
    const id=item.id;
    // To set the default Star Selected
    const [defaultRating, setDefaultRating] = useState(2);
    // To set the max number of Stars
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const starImageFilled ='https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    // Empty Star. You can also give the path from local
    const starImageCorner ='https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    const CustomRatingBar = () => {
      return (
        <ScrollView>
        <View style={styles.customRatingBarStyle}>
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => {
                  setDefaultRating(item);
                  setRate(item)
                  }}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    item <= defaultRating
                      ? { uri: starImageFilled }
                      : { uri: starImageCorner }
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
        </ScrollView>
      );
    };

    const  rateUs=(id,rate,review)=>{
      let mresponse='';
      let params = {
       'id': id,
       'rate': rate,
       'review':review,
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
       fetch('http://skylineautoservices.co/admin/skyline/api/rating.php',request)
       .then((response) => response.text())
       .then(response => {
         mresponse=response;
         setLoading(false);
         } 
        )
       .catch((error) => console.error(error))
       .finally(() =>{ 
         if(mresponse=='ok'){
            setReview("")
            alert("Thank you for rating the driver");
           }
         });
    
    }

    return (
      <ScrollView>
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
            
            
            {/* <Text style={globalStyles.text}>Enter Marks</Text> */}
            <Text style={styles.textStyleSmall}>Please Rate Us</Text>
            <CustomRatingBar />
            {/* <TextInput 
               style={globalStyles.textInput}
               onChangeText={(text)=>setRate(text)}
               /> */}
            {/* <Text style={globalStyles.text}>Enter Review</Text> */}
            <Text style={styles.textStyleSmall}>Enter Review</Text>
            <TextInput 
              style={globalStyles.textInput}
              onChangeText={(text)=>setReview(text)}
              value={review}
              />
              {isLoading?<ActivityIndicator size="large"color="#00ff00" /> :(
               <></>
               )}
             <TouchableOpacity 
                style={globalStyles.button}
                onPress={ ()=>{
                  setLoading(true);
                  rateUs(id,defaultRating,review);
                  }
                 
                  }
                >
                <Text style={globalStyles.buttonText}>Rate</Text>
            </TouchableOpacity>

            <View>
      </View>
      </View>
      </ScrollView>
    );
}
export default Rate;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'right',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'right',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});
