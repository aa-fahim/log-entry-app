import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import logo from './img/transparentLogo.png';

export default class WelcomeScreen extends React.Component {
    render() {
        return (

            <View style={styles.container}>

                <Image source={logo} style={styles.logoImg} />

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => this.props.navigation.navigate('EntryLog')}
                    >
                        <Text>New Entry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => this.props.navigation.navigate('ViewLog')}
                    >
                        <Text>View Entries</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => this.props.navigation.navigate('FindLog')}
                    >
                        <Text>Update Entry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        //onPress={() => this.props.navigation.navigate('Scanner')}
                    >
                        <Text>Camera</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4d4d4d',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonRow: {
        flexDirection: 'row',
        marginVertical: 20,
    },

    buttonStyle: {
        width: 75,
        height: 60,
        marginHorizontal: 20,
        alignItems: "center",
        backgroundColor: "#4A90E2",
        padding: 8,
        borderRadius: 10,
        elevation: 8,
    },

    logoImg: {
        width: 200,
        height: 200,
    }

});