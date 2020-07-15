import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

const AppButton = ({ onPress, title }) => {
    return(
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
    )
}

export default AppButton;

const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#4e8fea",
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 8,
      margin: 10,
    },

    appButtonText: {
      fontSize: 16,
      color: "#fff",
      alignSelf: "center",
      textTransform: "uppercase"
    }
});