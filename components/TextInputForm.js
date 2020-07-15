import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default class TextInputForm extends React.Component{
    render() {
        return(
            <View style={styles.textInputOutline}>
                <TextInput style={styles.textInput} placeholder={this.props.placeholder} placeholderTextColor='#ABABAB' onChangeText={this.props.handleFunction} />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    textInput: {
        margin: 20,
        height: 20,
        width: 150,
        fontSize: 16
    },

    textInputOutline: {
        borderRadius: 10,
        backgroundColor: '#b6c2bc',
        margin: 10
    }

});