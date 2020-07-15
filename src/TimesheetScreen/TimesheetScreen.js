import React from 'react';
import { View, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, Row, Rows } from 'react-native-table-component';
import AppButton from '../../components/AppButton';

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
            dataArray[i] = await [data[i].ProductName, data[i].LogId, data[i].DateIn.substring(0,10), data[i].EmployeeIn, data[i].DateOut ? data[i].DateOut.substring(0,10) : null, data[i].EmployeeOut]
        }

        await this.setState({
            tableData: dataArray
        })
    }

    render() {

        return (
            <View style={{flex:1}}>

                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        View previous entries
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <View style={{...(Platform.OS !== 'android' && {zIndex: 1000})}}>
                        <DropDownPicker
                            items={[
                                { label: 'Yesterday', value: '1' },
                                { label: 'Last 3 days', value: '3' },
                                { label: 'Last 7 days', value: '7' },
                                { label: 'Last 30 days', value: '30' },
                            ]}
                            defaultIndex={0}
                            placeholder="Pick a time range"
                            containerStyle={{ width: 160, height: 40, margin: 10 }}
                            style={{ backgroundColor: '#39644f' }}
                            dropDownStyle={{ backgroundColor: '#39644f' }}
                            onChangeItem={item => this.changeRange(item.value)}
                        />
                    </View>

                    <AppButton
                        title='Show'
                        onPress={() => this.getTableData(this.state.timeRange)}
                    />

                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} >
                        <View>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#ABABAB' }} style={{ margin: 20 }}>
                                <Row data={this.state.tableHead} style={styles.tableHeader} textStyle={styles.tableHeadText} widthArr={[120, 120, 120, 120, 120, 120]}/>
                                <Rows data={this.state.tableData} textStyle={styles.rowText} widthArr={[120, 120, 120, 120, 120, 120]}/>
                            </Table>
                        </View>
                    </ScrollView>
                    
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

    tableHeader: {
        height: 40,
    },

    tableHeadText: {
        margin: 6,
        textAlign: 'center',
        color: '#ABABAB',
        fontWeight: "900",
    },

    rowText: {
        margin: 6,
        textAlign: 'center',
        color: '#ABABAB'
    },

})