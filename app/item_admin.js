import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

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
                    <Ionicons name="trash-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                    <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    infoContainer: {

    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,

    },
    price: {
        fontSize: 18,
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


