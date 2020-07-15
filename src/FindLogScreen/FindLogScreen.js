import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TextInputForm from '../../components/TextInputForm';
import AppButton from '../../components/AppButton';

export default class FindScreen extends React.Component {
    state = {
        logId: '',
    }

    handleLogId = (text) => {
        this.setState({ logId: text })
    }

    findData = (IdVal) => {
        let response = fetch('http://192.168.2.33:3000/logEntry/' + IdVal + '', {
            method: 'GET',
        }).then(res =>
            res.json()
        ).then(res =>
            this.props.navigation.navigate('ViewLog', { dataVal: res })
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        Update Entry
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <TextInputForm placeholder="Log Id" handleFunction={this.handleLogId} />
                    <AppButton
                        title='Enter'
                        onPress={() => this.findData(this.state.logId)}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    headerContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#172c22'
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

});