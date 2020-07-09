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
import firebase from 'firebase';

const Stack = createStackNavigator();

export default class App extends React.Component {

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyA3gH9DwjSSeXQxpdrcg3WbEqUaiE0Iqbk",
      authDomain: "logsystem-11e41.firebaseapp.com",
      databaseURL: "https://logsystem-11e41.firebaseio.com",
      projectId: "logsystem-11e41",
      storageBucket: "logsystem-11e41.appspot.com",
      messagingSenderId: "583478101189",
      appId: "1:583478101189:web:a6894ce72cdafb926e1cac",
      measurementId: "G-Y3M21GQE6X"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='FindLog'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Welcome' component={WelcomeScreen} />
          <Stack.Screen name='EntryLog' component={EntryLogScreen} />
          <Stack.Screen name='FindLog' component={FindLogScreen} />
          <Stack.Screen name='ViewLog' component={ViewLogScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}


