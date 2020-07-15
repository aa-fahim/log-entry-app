import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import TextInputForm from '../../components/TextInputForm';
import AppButton from '../../components/AppButton';

export default class EntryScreen extends React.Component {
    state = {
        productName: '',
        logId: '',
        dateIn: '',
        employeeIn: '',
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
        const { isFocused } = this.state;
        return (
            <View style={{flex:1}}>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        Log Form
                    </Text>
                </View>

                <View style={styles.contentContainer} >
                    <TextInputForm placeholder="Product Name" handleFunction={this.handleProductName}/>
                    <TextInputForm placeholder="Log Id" handleFunction={this.handleLogId}/>
                    <TextInputForm placeholder="Date (YYYY-MM-DD)" handleFunction={this.handleDateIn}/>
                    <TextInputForm placeholder="Employee Name" handleFunction={this.handleEmployeeIn}/>

                    <AppButton title='Enter' onPress={() => this.uploadData(this.state.productName, this.state.logId, this.state.dateIn, this.state.employeeIn)}/>

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
        backgroundColor: '#000000' 
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
        textAlign: 'center',
    },

});