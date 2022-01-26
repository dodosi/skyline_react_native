// React Native Popup Menu – Over Flow Menu
// https://aboutreact.com/react-native-popup-menu/
//https://aboutreact.com/react-native-popup-menu/#CustomMaterialMenu
import React from 'react';
//import react in our code.
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import all the components we are going to use.
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

const CustomMaterialMenu = (props) => {
  let _menu = null;
  const url = 'http://skylineautoservices.co/';
  return (
    <View style={props.menustyle}>
      <Menu
        ref={(ref) => (_menu = ref)}
        button={
          props.isIcon ? (
            <TouchableOpacity onPress={() => _menu.show()}>
              <Image
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/menu_icon.png',
                }}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          ) : (
            <Text
              onPress={() => _menu.show()}
               style={props.textStyle}>
              {props.menutext}
            </Text>
          )
        }>
        
          <MenuItem
            onPress={() => {
              Linking.openURL('https://skylineautoservices.com/about-us');
              _menu.hide();
            }}>
            About Us
          </MenuItem>
       
    
          <MenuItem
            onPress={() => {
              //props.navigation.navigate('Services');
              Linking.openURL('https://skylineautoservices.com/privacy-policy');
              _menu.hide();
            }}>
            Terms and Conditions
          </MenuItem>
          <MenuItem
            onPress={() => {
              Linking.openURL('https://skylineautoservices.com/reviews');
              _menu.hide();
            }}>
            Testimonies
          </MenuItem>
          <MenuItem
            onPress={() => {
              props.navigation.navigate('Contact');
              _menu.hide();
              
            }}>
            Contact Us
          </MenuItem>
          <MenuItem
            onPress={() => {
              props.navigation.navigate('Earnings');
              _menu.hide();
            }}>
            Earnings
          </MenuItem>
          <MenuItem
            onPress={() => {
              AsyncStorage.removeItem('email');
              AsyncStorage.removeItem('type');
              props.navigation.navigate('Home');
              _menu.hide();
            }}>
            Logout
          </MenuItem>
         
      
        {/* <MenuItem
          onPress={() => {
            _menu.hide();
          }}>
          Demo Option
        </MenuItem> */}
        {/* <MenuItem disabled>Disabled option</MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            _menu.hide();
          }}>
          Option After Divider
        </MenuItem> */}
      </Menu>
    </View>
  );
};

export default CustomMaterialMenu;