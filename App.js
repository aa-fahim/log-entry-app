import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/WelcomeScreen';
import EntryLogScreen from './src/EntryLogScreen';
import FindLogScreen from './src/FindLogScreen';
import ViewLogScreen from './src/ViewLogScreen';
import BarcodeScanner from './src/BarcodeScanner';

const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Welcome' component={WelcomeScreen} />
          <Stack.Screen name='EntryLog' component={EntryLogScreen} />
          <Stack.Screen name='FindLog' component={FindLogScreen} />
          <Stack.Screen name='ViewLog' component={ViewLogScreen} />
          <Stack.Screen name='Scanner' component={BarcodeScanner} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}


