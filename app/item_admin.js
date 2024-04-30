import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { router } from "expo-router";

const screenWidth = Dimensions.get('window').width;

export default function ItemAdmin({ name, price, image, onDelete, onEdit }) {
    return (
        <View style={[styles.item, { width: screenWidth / 2 - 30 }]}>
            <Pressable onPress={() => router.push(`/pressedItem?name=${name}&price=${price}&image=${image}`)}>
                <Image source={{ uri: image }} style={styles.image} />
            </Pressable>
            <View style={styles.infoContainer}>
                <Text numberOfLines={1} style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity></View>
        </View>
    );
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        padding: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 20,
    },
    infoContainer: {

    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,

    },
    price: {
        fontSize: 16,
        color: '#888',
    },
    buttonText: {
        color: 'red',
        fontSize: 16,
    },
    editButton: {
        fontSize: 16,
    },
});


