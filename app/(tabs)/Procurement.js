import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, TextInput, ActivityIndicator } from "react-native";

const procurement = () => {

    return (
        <View style={styles.container}>
            <Text>jdkhjdf</Text>
        </View>
    );
};

export default procurement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    safeArea: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        width: '100%',
        marginTop: 40
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 40,
        marginRight: 10,
        marginLeft: 13,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
        marginLeft: 10,
        top: 10,
    },
    cartIcon: {
        position: 'absolute',
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartItemCount: {
        backgroundColor: 'red',
        color: 'white',
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 5,
    },
    productList: {
        width: '100%',
    },
    productItem: {
        padding: 10,
        marginBottom: 10,
    },
    signOutButton: {
        backgroundColor: "#FF4500",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 18,
        marginTop: 20,
        alignSelf: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    signOutButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
