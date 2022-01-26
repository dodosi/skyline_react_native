import React, { useRef } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import SettingsScreen from '../screens/SettingsScreen';
import CreateAccount from '../screens/CreateAccount';
import Garages from '../screens/Garages';
import Services from '../screens/Services';
import RequestDetails from '../screens/RequestDetails'
import CustomerLogin from '../screens/CustomerLogin';
import DriverLogin from '../screens/DriverLogin';
import CreateCustomerAccount from '../screens/CreateCustomerAccount';
import CreateDriverAccount from '../screens/CreateDriverAccount';
import Rate from '../screens/Rate';
import Payment from '../screens/Payment';
import PendingRequests from '../screens/PendingRequests';
import NotificationPage from '../screens/NotificationPage'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { globalStyles } from '../globals/styles';
import CustomMaterialMenu from './CustomMaterialMenu';
import Booking from '../screens/Booking';
import Contact from '../screens/Contact';
import MyTabs from '../components/MyTabs'
import DriverDetails from '../screens/DriverDetails';
import AddDocuments from '../screens/AddDocuments';
import TimeTable from '../screens/TimeTable';
import GarageServices from '../screens/GarageServices';
import Movements from '../screens/Movements';
import Proforma from '../screens/Proforma';
import PickLocation from '../screens/PickLocation'
import ResetPassword from '../screens/ResetPassword';
import CreateAccountNext from '../screens/CreateAccountNext';
import EditCustomerAccount from '../screens/EditCustomerAccount';
import EditDriverAccount from '../screens/EditDriverAccount';
import EditAccountNext from '../screens/EditAccountNext';
import Pay from '../screens/Pay';
import MyAccount from '../screens/MyAccount';
import Earnings from '../screens/Eanings';
const Stack = createStackNavigator();
export default function MyStacks(props){
  return(<>
   <Stack.Navigator
        initialRouteName='Skyline'
        screenOptions={({route, navigation}) => ({
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#00BCD4'
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#00BCD4',
          headerBackTitleVisible: false,
          headerRight: () => (
            <CustomMaterialMenu
              //Menu Text
              menutext="Menu"
              //Menu View Style
              menustyle={{marginRight: 16}}
              //Menu Text Style
              textStyle={{color: 'white'}}
              navigation={navigation}
              route={route}
              isIcon={true}
            />
          ),
        })}
        
        headerMode='float'
         >
        
      <Stack.Screen
        name='Tab'
        component={MyTabs}
        initialParams={{ item:[{email:props.email}] }}
        options={{
          title: 'Skyline',
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      <Stack.Screen
        name='CreateAccount'
        component={CreateAccount}
        options={{
          title: 'Create Account',
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        
       />
        <Stack.Screen
        name='Garages'
        component={Garages}
        options={{
          title: 'Garages',
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        
       />
      <Stack.Screen
        name='RequestDetails'
        component={RequestDetails}
        options={{
          title: 'Request Details',
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
         />
          <Stack.Screen
            name='CustomerLogin'
            component={CustomerLogin}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
         <Stack.Screen
            name='DriverLogin'
            component={DriverLogin}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
         <Stack.Screen
            name='PendingRequests'
            component={PendingRequests}
            options={{
              title: 'Pending Trips',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
         <Stack.Screen
            name='CreateDriverAccount'
            component={CreateDriverAccount}
            options={{
              title: 'Register as Driver',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
         <Stack.Screen
            name='CreateCustomerAccount'
            component={CreateCustomerAccount}
            options={{
              title: 'Create Account',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
         <Stack.Screen
            name='CreateAccountNext'
            component={CreateAccountNext}
            options={{
              title: 'Create Account',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
          {/* <Stack.Screen
            name='MyAccount'
            component={MyAccount}
            options={{
              title: 'My Account',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         /> */}
          <Stack.Screen
            name='EditCustomerAccount'
            component={EditCustomerAccount}
            options={{
              title: 'Edit Account',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
         <Stack.Screen
            name='EditDriverAccount'
            component={EditDriverAccount}
            options={{
              title: 'Edit Account',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
         <Stack.Screen
            name='EditAccountNext'
            component={EditAccountNext}
            options={{
              title: 'Edit Account',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
         <Stack.Screen
            name='NotificationPage'
            component={NotificationPage}
            options={{
              title: 'Notifications',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
         />
       
       <Stack.Screen
        name='Services'
        component={Services}
        options={{
          title: "Services",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='Rate'
        component={Rate}
        options={{
          title: "Rate",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='Booking'
        component={Booking}
        options={{
          title: "Booking Information",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='Payment'
        component={Payment}
        options={{
          title: "Payment",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      <Stack.Screen
        name='Contact'
        component={Contact}
        options={{
          title: "Contact Us",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      <Stack.Screen
        name='DriverDetails'
        component={DriverDetails}
        options={{
          title: "Driver Details",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='AddDocuments'
        component={AddDocuments}
        options={{
          title: "Add Documents",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='TimeTable'
        component={TimeTable}
        options={{
          title: "Working Days",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='GarageServices'
        component={GarageServices}
        options={{
          title: "Service Details",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='Movements'
        component={Movements}
        options={{
          title: "Movements",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
       <Stack.Screen
        name='Proforma'
        component={Proforma}
        options={{
          title: "Proforma",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='PickLocation'
        component={PickLocation}
        options={{
          title: "Pick up location",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='ResetPassword'
        component={ResetPassword}
        options={{
          title: "Reset Password",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='Pay'
        component={Pay}
        options={{
          title: "Confirm Payment",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name='Earnings'
        component={Earnings}
        options={{
          title: "Earnings",
          headerStyle: {
            backgroundColor: '#00BCD4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
    </Stack.Navigator>
  </>
  );
}