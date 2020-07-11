import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
import logo from '../img/transparentLogo.png';

export default class TimesheetScreen extends React.Component {

    state = {
        tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
        tableData: [
            ['1', '2', '3', '4'],
            ['a', 'b', 'c', 'd'],
            ['1', '2', '3', '456\n789'],
            ['a', 'b', 'c', 'd']
        ]
    }

    changeRange(range) {
        this.setState({
            timeRange: range
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logoImg} />
                <DropDownPicker
                    items={[
                        { label: 'Yesterday', value: '1' },
                        { label: 'Last 3 days', value: '3' },
                        { label: 'Last 7 days', value: '7' }
                    ]}
                    defaultIndex={0}
                    placeholder="Pick a time range"
                    containerStyle={{ width: 150, height: 40, margin: 15}}
                    activeLabelStyle={{ color: 'red' }}
                    style={{ backgroundColor: '#39644f' }}

                    onChangeItem={item => this.changeRange(item.value)}
                />
                <Button
                    title='Show'
                    onPress={() => console.log(this.state.timeRange)}
                />
                <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }} style={{margin:20}}>
                    <Row data={this.state.tableHead} style={styles.tableHeader} textStyle={styles.rowText} />
                    <Rows data={this.state.tableData} textStyle={styles.rowText} />
                </Table>
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

    logoImg: {
        width: 100,
        height: 100,
    },

    tableHeader: {
        height: 40, 
    },

    rowText: { 
        margin: 6, 
        textAlign: 'center',
        color: '#fafafa' 
    }
})