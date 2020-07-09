import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import logo from './img/transparentLogo.png';
import firebase from 'firebase';

export default class ViewScreen extends React.Component {
    state = {}    

    handleName = (text) => {
        this.setState({name: text})
    }

    handleAge = (text) => {
        this.setState({age: Number(text)})
    }

    handleHairColor = (text) => {
        this.setState({hairColor: text})
    }

    updateData = (nameVal) => {

        console.log(this.state)
        let response = fetch('http://localhost:3000/users/'+nameVal+'', {
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

        /*firebase.database().ref('users/'+nameVal+'/').set(
            this.state
        );*/
    }

    deleteUser = (nameVal) => {

        fetch('http://localhost:3000/users/'+nameVal+'', {
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
            <View style={styles.container}>
                <Image source={logo} style={styles.logoImg} />
                <Text style={styles.header}>
                    Make your updates
                </Text>
                <TextInput style={styles.textInput} placeholder={dataVal.name} placeholderTextColor='black' onChangeText={this.handleName} />
                <TextInput style={styles.textInput} placeholder={dataVal.age.toString()} placeholderTextColor='black' onChangeText={this.handleAge} />
                <TextInput style={styles.textInput} placeholder={dataVal.hairColor} placeholderTextColor='black' onChangeText={this.handleHairColor} />
                <View style={styles.buttonsRow}>
                    <View style = {styles.buttonStyle}>
                        <Button
                            title='Save Changes'
                            onPress={() => {
                                (Object.keys(this.state).length === 0 && this.state.constructor === Object) ? 
                                    (Alert.alert(
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
                                    'Are you sure you want to delete',
                                    [
                                        {text: 'Yes', onPress: () => this.deleteUser(dataVal.name)},
                                        {text: 'No'}
                                    ]
                                )}
                            }
                        />
                    </View>
                </View>
            </View>
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