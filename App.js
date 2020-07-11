import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FindLogStackScreen from './src/FindLogScreen/FindLogStackScreen';
import EntryLogScreen from './src/EntryLogScreen/EntryLogScreen';
import BarcodeScanner from './src/BarcodeScannerScreen/BarcodeScanner';
import Timesheet from './src/TimesheetScreen/TimesheetScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#101010',
            style: {
              backgroundColor: '#39644f'
            }
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName
              if (route.name == 'EntryLog') {
                iconName = 'ios-create'
              } else if (route.name == 'FindLogStack') {
                iconName = 'md-search'
              } else if (route.name == 'Scanner') {
                iconName = 'ios-barcode'
              } else if (route.name == 'Timesheet') {
                iconName = 'ios-calendar'
              }
              return <Ionicons name={iconName} color={color} size={size} />
            }
          })}
        >
          <Tab.Screen
            name='EntryLog'
            component={EntryLogScreen}
          />
          <Tab.Screen
            name='FindLogStack'
            component={FindLogStackScreen}
          />
          <Tab.Screen
            name='Scanner'
            component={BarcodeScanner}
          />
          <Tab.Screen
            name='Timesheet'
            component={Timesheet}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}


