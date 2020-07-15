import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

export default class EntryResultScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Your entry was {this.props.route.params.result}
                </Text>
                <Button
                    title='Ok'
                    onPress = {() => this.props.navigation.navigate('EntryLog')}
                >

                </Button>
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
        fontSize: 20,
        margin: 10,
    },

});