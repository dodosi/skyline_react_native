import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Services from '../screens/Services';
import Requests from '../screens/Requests';
import MyAccount from '../screens/MyAccount';
import Contact from '../screens/Contact';
import NotificationPage from '../screens/NotificationPage';
const Tab = createBottomTabNavigator();
export default function MyTabs(props) {
    return (
      <Tab.Navigator
      
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'lightgray',
        activeBackgroundColor: '#00BCD4',
        inactiveBackgroundColor: '#00BCD4',
        allowFontScaling:true,
            style: {
                  backgroundColor: '#00BCD4',
                  paddingBottom: 20,
               },
             labelStyle: {
                fontSize: 15,
                margin: 0,
                padding: 0,
              },
     }}
      >
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            
            />
        <Tab.Screen name="Services" 
            component={Services}
            initialParams={{ item:[] }}
            options={({ navigation, route }) => ({
              headerTitle: props => <LogoTitle {...props} />,
            })}
            />
          <Tab.Screen name="Requests" 
            component={Requests}
            initialParams={{ item:[{email:props.email}] }}
            options={({ navigation, route }) => ({
              headerTitle: props => <LogoTitle {...props} />,
            })}
            />
        
        <Tab.Screen 
            name="Account" 
            component={MyAccount} 
            initialParams={{ item:[{refresh:true}] }}
            options={({ navigation, route }) => ({
              headerTitle: props => <LogoTitle {...props} />,
            })}
            />
       
        

      </Tab.Navigator>
      
    );
  }