import React from 'react';
import { View, StyleSheet, Button, Image, ScrollView, Text, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';

export default class TimesheetScreen extends React.Component {

    state = {
        tableHead: ['Product Name', 'Log Id', 'Date In', 'Employee', 'Date Out', 'Employee'],
    }

    changeRange = (range) => {
        this.setState({
            timeRange: range
        })
    }

    getTableData = (dateRange) => {
        fetch('http://192.168.2.33:3000/logEntry/date/' + dateRange + '').then(res =>
            res.json()
        ).then(res =>
            this.setTableData(res)
        )
    }

    setTableData = async (data) => {
        let dataArray = await new Array();

        for (let i = 0; i < data.length; i++) {
            dataArray[i] = await [data[i].ProductName, data[i].LogId, data[i].DateIn, data[i].EmployeeIn, data[i].DateOut, data[i].EmployeeOut]
        }

        await this.setState({
            tableData: dataArray
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{
                    marginTop: 100, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={styles.header}>
                        View previous entries
                    </Text>

                    <View style={{...(Platform.OS !== 'android' && {zIndex: 1000})}}
                    >
                        <DropDownPicker
                            items={[
                                { label: 'Yesterday', value: '1' },
                                { label: 'Last 3 days', value: '3' },
                                { label: 'Last 7 days', value: '7' }
                            ]}
                            defaultIndex={0}
                            placeholder="Pick a time range"
                            containerStyle={{ width: 160, height: 40, margin: 10 }}
                            style={{ backgroundColor: '#39644f' }}
                            dropDownStyle={{ backgroundColor: '#39644f' }}
                            onChangeItem={item => this.changeRange(item.value)}
                        />
                    </View>

                    <Button
                        title='Show'
                        onPress={() => this.getTableData(this.state.timeRange)}
                    />

                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} >
                        <View>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#ABABAB' }} style={{ margin: 20 }}>
                                <Row data={this.state.tableHead} style={styles.tableHeader} textStyle={styles.rowText} />
                                <Rows data={this.state.tableData} textStyle={styles.rowText} />
                            </Table>
                        </View>
                    </ScrollView>
                    
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

    tableHeader: {
        height: 40,
    },

    rowText: {
        margin: 6,
        textAlign: 'center',
        color: '#ABABAB'
    },

})