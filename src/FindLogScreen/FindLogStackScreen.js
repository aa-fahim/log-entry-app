import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FindLogScreen from './FindLogScreen';
import ViewLogScreen from './ViewLogScreen';

const FindStack = createStackNavigator();

export default class FindLogStackScreen extends React.Component {
    render() {
        return (
            <FindStack.Navigator
                initialRouteName='FindLog'
                screenOptions={{
                    headerShown: false
                }}
            >
                <FindStack.Screen name='FindLog' component={FindLogScreen} />
                <FindStack.Screen name='ViewLog' component={ViewLogScreen} />
            </FindStack.Navigator>
        )
    }
}