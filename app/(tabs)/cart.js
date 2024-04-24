import { StyleSheet, Text, View } from "react-native";
import React from "react";

const cart = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cart Page</Text>
        </View>
    );
};

export default cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ADD8E6',
    },
    text: {
        fontSize: 28,
    },
});
