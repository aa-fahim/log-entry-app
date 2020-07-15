import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EntryLogScreen from './EntryLogScreen';
import EntryResultScreen from './EntryResultScreen';

const EntryStack = createStackNavigator();

export default class FindLogStackScreen extends React.Component {
    render() {
        return (
            <EntryStack.Navigator
                initialRouteName='EntryLog'
                screenOptions={{
                    headerShown: false
                }}
            >
                <EntryStack.Screen name='EntryLog' component={EntryLogScreen} />
                <EntryStack.Screen name='EntryResult' component={EntryResultScreen} />
            </EntryStack.Navigator>
        )
    }
}