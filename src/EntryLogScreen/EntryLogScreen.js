import React from 'react';
import { Button, View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';

export default class EntryScreen extends React.Component {
    state = {
        productName: '',
        logId: '',
        dateIn: '',
        employeeIn: ''
    }

    handleProductName = (text) => {
        this.setState({ productName: text })
    }

    handleLogId = (text) => {
        this.setState({ logId: text })
    }

    handleDateIn = (text) => {
        this.setState({ dateIn: text })
    }

    handleEmployeeIn = (text) => {
        this.setState({ employeeIn: text })
    }

    uploadData = (productNameVal, logIdVal, dateInVal, employeeInVal) => {

        let response = fetch('http://192.168.2.33:3000/logEntry/', {
            method: 'POST',
            body: JSON.stringify({
                ProductName: productNameVal,
                LogId: Number(logIdVal),
                DateIn: dateInVal,
                DateOut: null,
                EmployeeIn: employeeInVal,
                EmployeeOut: ''
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.ok == false) {
                this.props.navigation.navigate('EntryResult', { result: "unsuccessful" })
            } else {
                this.props.navigation.navigate('EntryResult', { result: "successful" })
            }
        }
        );

    }

    render() {
        return (
            <View style={{flex:1}}>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        Log Form
                    </Text>
                </View>

                <View style={styles.contentContainer} >
                    <TextInput style={styles.textInput} placeholder="Product Name" placeholderTextColor='#ABABAB' onChangeText={this.handleProductName} />
                    <TextInput style={styles.textInput} placeholder="Log Id" placeholderTextColor='#ABABAB' onChangeText={this.handleLogId} />
                    <TextInput style={styles.textInput} placeholder="Date (YEAR-MM-DD)" placeholderTextColor='#ABABAB' onChangeText={this.handleDateIn} />
                    <TextInput style={styles.textInput} placeholder="Employee Name" placeholderTextColor='#ABABAB' onChangeText={this.handleEmployeeIn} />
                    <View style={styles.submitButton}>
                        <Button
                            title='Enter'
                            onPress={() => this.uploadData(this.state.productName, this.state.logId, this.state.dateIn, this.state.employeeIn)}
                        />
                    </View>
                </View>

            </View>
        )
    }
};

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
        margin: 20
    },

    submitButton: {
        marginVertical: 10,
    },

});