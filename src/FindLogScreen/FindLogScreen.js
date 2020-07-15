import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';

export default class FindScreen extends React.Component {
    state = {
        logId: '',
    }    

    handleLogId = (text) => {
        this.setState({logId: text})
    }

    findData = (IdVal) => {
        let response = fetch('http://192.168.2.33:3000/logEntry/'+IdVal+'', {
            method: 'GET',
        }).then(res => 
            res.json()
        ).then(res =>
            this.props.navigation.navigate('ViewLog', {dataVal: res})
        );
    }
    
    render() {
        return (
            <View style={{flex:1}}>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        Update Entry
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <TextInput style={styles.textInput} placeholder="Log ID #" placeholderTextColor='#ABABAB' onChangeText = {this.handleLogId} />
                    <View style={styles.submitButton}>
                        <Button
                            title='Enter'
                            onPress = {() => this.findData(this.state.logId)}
                        />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    headerContainer: { 
        flex: 3, 
        alignItems: 'center', 
        justifyContent:'center', 
        backgroundColor: '#39644f' 
    },

    contentContainer: {
        flex : 7, 
        alignItems: 'center', 
        flexDirection:'column', 
        justifyContent:'center', 
        backgroundColor: '#4d4d4d',
    },

    header: {
        fontSize: 50,
        color: '#ABABAB',
    },

    textInput: {
        marginVertical: 10,
    },

    submitButton: {
        marginVertical: 10,
    },
    
});