import React from 'react';
import { Button, View, Text, TextInput, StyleSheet, Image, Container, TouchableOpacity } from 'react-native';
import logo from '../img/transparentLogo.png';

export default class EntryScreen extends React.Component {
    state = {
        productName: '',
        logId: '',
        dateIn: '',
        employeeIn: ''
    }    

    handleProductName = (text) => {
        this.setState({productName: text})
    }

    handleLogId = (text) => {
        this.setState({logId: text})
    }

    handleDateIn = (text) => {
        this.setState({dateIn: text})
    }

    handleEmployeeIn = (text) => {
        this.setState({employeeIn: text})
    }

    uploadData = (productNameVal, logIdVal, dateInVal, employeeInVal) => {

        let response = fetch('http://192.168.2.33:3000/logEntry/', {
            method: 'POST',
            body: JSON.stringify({
                    ProductName: productNameVal,
                    LogId: Number(logIdVal),
                    DateIn: dateInVal,
                    DateOut: null,
                    EmployeeIn : employeeInVal,
                    EmployeeOut: ''
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then( 
           console.log(this.state)//this.props.navigation.navigate('ViewLog')
        );

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logoImg} />
                <Text style={styles.header}>
                    Log Form
                </Text>
                <TextInput style={styles.textInput} placeholder="Product Name" placeholderTextColor='#ABABAB' onChangeText = {this.handleProductName} />
                <TextInput style={styles.textInput} placeholder="Log Id" placeholderTextColor='#ABABAB' onChangeText = {this.handleLogId} />
                <TextInput style={styles.textInput} placeholder="Date In(YEAR-MM-DD)" placeholderTextColor='#ABABAB' onChangeText = {this.handleDateIn} />
                <TextInput style={styles.textInput} placeholder="Employee Name" placeholderTextColor='#ABABAB' onChangeText = {this.handleEmployeeIn} />
                <View style={styles.submitButton}>
                    <Button
                        title='Enter'
                        onPress={() => this.uploadData(this.state.productName, this.state.logId, this.state.dateIn, this.state.employeeIn)}
                    />
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

    header: {
        fontSize: 30,
        marginBottom: 20,
        color: '#ABABAB',
    },

    logoImg: {
        width: 100,
        height: 100,
    },

    textInput: {
        marginVertical: 10,
    },

    submitButton: {
        marginVertical: 10,
    },

});