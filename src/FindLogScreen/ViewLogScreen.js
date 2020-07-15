import React from 'react';
import { View, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import TextInputForm from '../../components/TextInputForm';
import AppButton from '../../components/AppButton';

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
                    <ScrollView>
                        <TextInputForm placeholder={dataVal.ProductName} handleFunction={this.handleProductName} />
                        <TextInputForm placeholder={dataVal.LogId.toString()} handleFunction={this.handleLogId} />
                        <TextInputForm placeholder={dataVal.DateIn.substring(0, 10)} handleFunction={this.handleDateIn} />
                        <TextInputForm placeholder={dataVal.DateOut ? dataVal.DateOut.substring(0, 10) : 'Enter date out here'} handleFunction={this.handleDateOut} />
                        <TextInputForm placeholder={dataVal.EmployeeIn} handleFunction={this.handleEmployeeIn} />
                        <TextInputForm placeholder={dataVal.EmployeeOut ? dataVal.EmployeeOut : 'Enter employee out here'} handleFunction={this.handleEmployeeOut} />

                        <View style={styles.buttonsRow}>
                            <AppButton
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

                            <AppButton
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
                                }}
                            />
                        </View>
                    </ScrollView>
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
        textAlign: 'center',
    },

    buttonsRow: {
        marginVertical: 10,
        flexDirection: 'row',
    },

    buttonStyle: {
        paddingHorizontal: 20,
    }

});