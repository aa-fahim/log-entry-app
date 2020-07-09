import React from 'react';
import { Button, View, Text, TextInput, StyleSheet, Image, Container, TouchableOpacity } from 'react-native';
import logo from './img/transparentLogo.png';
import firebase from 'firebase';

export default class EntryScreen extends React.Component {
    state = {
        name: '',
        age: '',
        hairColor: '',
    }    

    handleName = (text) => {
        this.setState({name: text})
    }

    handleAge = (text) => {
        this.setState({age: text})
    }

    handleHairColor = (text) => {
        this.setState({hairColor: text})
    }

    uploadData = (nameVal, ageVal, hairColorVal) => {

        let user = {
            name: nameVal,
            age : Number(ageVal),
            hairColor : hairColorVal,
        }
        JSON.stringify(user)
        console.log(user)

        let response = fetch('http://localhost:3000/users/', {
            method: 'POST',
            body: JSON.stringify({
                    name: nameVal,
                    age : Number(ageVal),
                    hairColor : hairColorVal,
                
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => 
            this.props.navigation.navigate('Welcome')
        );

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logoImg} />
                <Text style={styles.header}>
                    Log Form
                </Text>
                <TextInput style={styles.textInput} placeholder="Name" placeholderTextColor='#ABABAB' onChangeText = {this.handleName} />
                <TextInput style={styles.textInput} placeholder="Age" placeholderTextColor='#ABABAB' onChangeText = {this.handleAge} />
                <TextInput style={styles.textInput} placeholder="Hair Color" placeholderTextColor='#ABABAB' onChangeText = {this.handleHairColor} />
                <View style={styles.submitButton}>
                    <Button
                        title='Enter'
                        onPress={() => this.uploadData(this.state.name, this.state.age, this.state.hairColor)}
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