import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function ItemCart({ name, price, image, quantity, onDelete }) {
    const totalPrice = price * quantity;

    return (
        <View style={[styles.item, { width: screenWidth / 2 - 30 }]}>
            <Pressable onPress={() => router.push(`/pressedItem?name=${name}&price=${price}&image=${image}`)}>
                <Image source={{ uri: image }} style={styles.image} />
            </Pressable>
            <View style={styles.infoContainer}>
                <Text numberOfLines={1} style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.quantity}>Quantity: {quantity}</Text>
                <Text style={{ fontSize: 20 }}>Total: ${totalPrice}</Text>
            </View>
            <Pressable onPress={onDelete}>
                <MaterialIcons name="delete" size={24} color="black" style={styles.deleteIcon} />
            </Pressable>
        </View>
    );
}



const styles = StyleSheet.create({
    item: {

        borderRadius: 10,
        padding: 5,
        alignItems: 'flex-start'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginRight: 20,
    },
    infoContainer: {

    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,

    },
    price: {
        fontSize: 20,
        color: '#888',
    },
    quantity: {
        fontSize: 16,
        color: '#555',
    },
    deleteIcon: {
        alignSelf: 'flex-end',
        fontSize: 30
    },
});
