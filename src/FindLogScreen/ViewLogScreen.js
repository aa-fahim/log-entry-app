import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';

export default class ViewScreen extends React.Component {
    state = {}

    handleProductName = (text) => {
        if (text == "") {
            this.setState({ ProductName: undefined })
        } else {
            this.setState({ ProductName: text })
        }
        console.log(this.state)
    }

    handleLogId = (text) => {
        if (text == "") {
            this.setState({ logId: undefined })
        } else {
            this.setState({ logId: Number(text) })
        }
        console.log(this.state)
    }

    handleDateIn = (text) => {
        if (text == "") {
            this.setState({ DateIn: undefined })
        } else {
            this.setState({ DateIn: text })
        }
        console.log(this.state)
    }

    handleDateOut = (text) => {
        if (text == "") {
            this.setState({ DateOut: undefined })
        } else {
            this.setState({ DateOut: text })
        }
        console.log(this.state)
    }

    handleEmployeeIn = (text) => {
        if (text == "") {
            this.setState({ EmployeeIn: undefined })
        } else {
            this.setState({ EmployeeIn: text })
        }
        console.log(this.state)
    }

    handleEmployeeOut = (text) => {
        if (text == "") {
            this.setState({ EmployeeOut: undefined })
        } else {
            this.setState({ EmployeeOut: text })
        }
        console.log(this.state)
    }

    updateData = (logId) => {

        console.log(this.state)
        let response = fetch('http://192.168.2.33:3000/logEntry/' + logId + '', {
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

        fetch('http://192.168.2.33:3000/logEntry/' + logId + '', {
            method: 'DELETE'
        }).then(res =>
            res.json()
        ).then(res =>
            this.props.navigation.navigate('FindLog')
        );

    }

    render() {
        var { dataVal } = this.props.route.params

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : "height"}>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        Make your updates
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <TextInput style={styles.textInput} placeholder={dataVal.ProductName} placeholderTextColor='#ABABAB' onChangeText={this.handleProductName} />
                    <TextInput style={styles.textInput} placeholder={dataVal.LogId.toString()} placeholderTextColor='#ABABAB' onChangeText={this.handleLogId} />
                    <TextInput style={styles.textInput} placeholder={dataVal.DateIn} placeholderTextColor='#ABABAB' onChangeText={this.handleDateIn} />
                    <TextInput style={styles.textInput} placeholder={dataVal.DateOut ? dataVal.DateOut : 'Enter date out here'} placeholderTextColor='#ABABAB' onChangeText={this.handleDateOut} />
                    <TextInput style={styles.textInput} placeholder={dataVal.EmployeeIn} placeholderTextColor='#ABABAB' onChangeText={this.handleEmployeeIn} />
                    <TextInput style={styles.textInput} placeholder={dataVal.EmployeeOut ? dataVal.EmployeeOut : 'Enter employee out here'} placeholderTextColor='#ABABAB' onChangeText={this.handleEmployeeOut} />

                    <View style={styles.buttonsRow}>

                        <View style={styles.buttonStyle}>
                            <Button
                                title='Save Changes'
                                onPress={() => {
                                    (Object.keys(this.state).length === 0 && this.state.constructor === Object) ?
                                        (Alert.alert(
                                            'Warning',
                                            'No changes have been made!',
                                            [
                                                { text: 'Ok' },
                                                { text: 'Cancel', onPress: () => this.props.navigation.navigate('FindLog') }
                                            ]
                                        )) :
                                        (this.updateData(dataVal.LogId), this.props.navigation.navigate('FindLog'))
                                }}
                            />
                        </View>

                        <View>
                            <Button
                                title='Delete'
                                onPress={() => {
                                    Alert.alert(
                                        'Warning',
                                        'Are you sure you want to delete?',
                                        [
                                            { text: 'Yes', onPress: () => this.deleteUser(dataVal.LogId) },
                                            { text: 'No' }
                                        ]
                                    )
                                }
                                }
                            />
                        </View>

                    </View>

                </View>
                
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({

    headerContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#39644f'
    },

    contentContainer: {
        flex: 7,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#4d4d4d',
    },

    header: {
        fontSize: 50,
        color: '#ABABAB',
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