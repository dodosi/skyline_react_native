//https://stackoverflow.com/questions/31889921/how-to-implement-radio-button-in-react-native
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useEffect } from 'react';
import {globalStyles} from '../globals/styles';
import { RadioButton, Text} from 'react-native-paper';
import axios from 'axios';

function upload(localUri,email,docType) {
      let formData = new FormData();
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let filename = localUri.split('/').pop();
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('files', { uri: localUri, name: filename, type });
      formData.append("submit", 'submit');
      formData.append("email",email);
      formData.append("type",docType);
      axios({
        method: 'POST',
        url: 'http://skylineautoservices.co/admin/skyline/api/upload.php',
        data: formData,
        headers: {
            'Content-Type' :'multipart/form-data'
        },

    }).then((response) => {
        console.log('response', response)
        if (response.status === 200) {
            console.log('status 200', response)
            alert("submitted", '')
        }
    })
        .catch((error) => {
            console.log('error res', response)
            self.setState({spinnerBool: false, MyProfileResp: ''}, () => {
                alert("Error,Message Not submitted")
                console.log('Error', error.response);
            });
        })

}
export default function AddDocuments(props) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [checked, setChecked] = React.useState('');  
  const { route,navigation } = props
  const {item}=route.params;
  const email=item.email;    
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        
        <TouchableOpacity
          style={globalStyles.button} 
          onPress={()=>{
            //localUri.split('/').pop();

              // alert(selectedImage.localUri.split('/').pop());
               upload(selectedImage.localUri,email,checked);
               }}>
           { <Text style={globalStyles.buttonText}>UPLOAD</Text> }
      
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={globalStyles.container}>
       <Text style={globalStyles.text}>Please Select Type</Text>
        
        <View  style={{flex: 1, flexDirection: 'row',height:10}}>
          <RadioButton
            value="first"
            status={ checked === 'first' ? 'checked' : 'unchecked' }
            onPress={() =>
              {
                setChecked('Profile Picture');
                alert("Profile Picture");
              } }
          />
         <Text style={globalStyles.textHome}>Profile Picture</Text>
       </View>
       <View  style={{flex: 1, flexDirection: 'row',height:2}}>
          <RadioButton
            style={{height:2}}
            value="second"
            status={ checked === 'second' ? 'checked' : 'unchecked' }
            onPress={() => {
              setChecked('Driving Licence');
              alert("Driving Licence");
            }}
          />
         <Text style={globalStyles.textHome}>Driving Licence</Text>
       </View>
       <View  style={{flex: 9, flexDirection: 'row'}}>
        <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} 
        style={styles.logo} />
      </View>

      <TouchableOpacity onPress={
          ()=>{
          if(checked!=''){
            openImagePickerAsync()
           }else{
             alert("Please Choose Document Type");
           }
          }
         } 
         style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Other styles hidden to keep the example brief... */
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
