import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Button, Alert, KeyboardAvoidingView } from 'react-native';
import logo from '../img/transparentLogo.png';

export default class ViewScreen extends React.Component {
    state = {}    

    handleProductName = (text) => {
        if (text == "") {
            this.setState({productName: undefined})
        } else {
            this.setState({productName: text})
        }
        console.log(this.state)
    }

    handleLogId = (text) => {
        if (text == "") {
            this.setState({logId: undefined})
        } else {
            this.setState({logId: Number(text)})
        }
        console.log(this.state)
    }

    handleDateIn = (text) => {
        if (text == "") {
            this.setState({dateIn: undefined})
        } else {
            this.setState({dateIn: text})
        }
        console.log(this.state)
    }

    handleDateOut = (text) => {
        if (text == "") {
            this.setState({dateOut: undefined})
        } else {
            this.setState({dateOut: text})
        }
        console.log(this.state)
    }

    handleEmployeeIn = (text) => {
        if (text == ""){
            this.setState({employeeIn: undefined})
        } else {
            this.setState({employeeIn: text})
        }
        console.log(this.state)
    }

    handleEmployeeOut = (text) => {
        if (text == ""){
            this.setState({employeeOut: undefined})
        } else {
            this.setState({employeeOut: text})
        }
        console.log(this.state)
    }

    updateData = (logId) => {

        console.log(this.state)
        let response = fetch('http://192.168.2.33:3000/users/'+logId+'', {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => 
            res.json()
        ).then(res =>
            this.props.navigation.navigate('FindLog')
        );

    }

    deleteUser = (logId) => {

        fetch('http://192.168.2.33:3000/users/'+logId+'', {
            method: 'DELETE'
        }).then(res => 
            res.json()
        ).then(res =>
            this.props.navigation.navigate('FindLog')
        );

    }

    render() {
        var { dataVal } = this.props.route.params
        // for debugging purposes, for when I want to focus on changing something solely on this screen
        /*var dataVal = {
            name: "Fahim",
            age: 24,
            hairColor: "Black"
        }*/

        return (
            <KeyboardAvoidingView style={styles.container}>
                <Image source={logo} style={styles.logoImg} />
                <Text style={styles.header}>
                    Make your updates
                </Text>
                <TextInput style={styles.textInput} placeholder={dataVal.ProductName} placeholderTextColor='#ABABAB' onChangeText = {this.handleProductName} />
                <TextInput style={styles.textInput} placeholder={dataVal.LogId.toString()} placeholderTextColor='#ABABAB' onChangeText = {this.handleLogId} />
                <TextInput style={styles.textInput} placeholder={dataVal.DateIn} placeholderTextColor='#ABABAB' onChangeText = {this.handleDateIn} />
                <TextInput style={styles.textInput} placeholder={dataVal.DateOut} placeholderTextColor='#ABABAB' onChangeText = {this.handleDateOut} />
                <TextInput style={styles.textInput} placeholder={dataVal.EmployeeIn} placeholderTextColor='#ABABAB' onChangeText = {this.handleEmployeeIn} />
                <TextInput style={styles.textInput} placeholder={dataVal.EmployeeOut} placeholderTextColor='#ABABAB' onChangeText = {this.handleEmployeeOut} />
                <View style={styles.buttonsRow}>
                    <View style = {styles.buttonStyle}>
                        <Button
                            title='Save Changes'
                            onPress={() => {
                                (Object.keys(this.state).length === 0 && this.state.constructor === Object) ? 
                                    (Alert.alert(
                                        'Warning',
                                        'No changes have been made!',
                                        [
                                            {text: 'Ok'},
                                            {text: 'Cancel', onPress: () => this.props.navigation.navigate('FindLog')}
                                        ]
                                    )):
                                    (this.updateData(dataVal.name), this.props.navigation.navigate('FindLog'))
                            }}
                        />
                    </View>
                    <View>
                        <Button
                            title='Delete'
                            onPress= {() => {
                                Alert.alert(
                                    'Warning',
                                    'Are you sure you want to delete?',
                                    [
                                        {text: 'Yes', onPress: () => this.deleteUser(dataVal.name)},
                                        {text: 'No'}
                                    ]
                                )}
                            }
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

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
        color: '#DC9797',
    },

    buttonsRow: {
        marginVertical: 10,
        flexDirection: 'row',
    },

    buttonStyle: {
        paddingHorizontal: 20,
    }

});