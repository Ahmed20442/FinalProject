import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { addDoc, collection, doc } from '@firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";

const screenWidth = Dimensions.get('window').width;

const Item = ({ name, price, image, userId, cartItemCount, setCartItemCount }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  const addToCart = async () => {
    try {
      if (!userId) {
        console.error('User ID is undefined');
        return;
      }

      const userRef = doc(db, 'users', userId);
      const cartItemsRef = collection(userRef, 'cartItems');
      await addDoc(cartItemsRef, {
        name,
        price,
        image,
        quantity
      });
      setCartItemCount(cartItemCount + quantity);
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
    // You can handle the rating logic here, like submitting it to a database
  };

  return (
    <View style={styles.itemContainer}>
      <Pressable onPress={() => router.push(`/pressedItem?name=${name}&price=${price}&image=${image}`)}>
        <Image source={{ uri: image }} style={styles.image} />
      </Pressable>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => handleRating(star)}>
              <Ionicons
                name={rating >= star ? 'star' : 'star-outline'}
                size={24}
                color={rating >= star ? 'gold' : 'gray'}
                style={styles.starIcon}
              />
            </Pressable>
          ))}
        </View>
        <View style={styles.quantityContainer}>
          <Pressable onPress={decrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
        <Pressable onPress={addToCart} style={styles.addToCartButton}>
          <Ionicons name="cart" size={24} color="black" />

        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    maxWidth: screenWidth - 40, // 20 padding on each side
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    maxWidth: screenWidth - 160, // Max width for name to accommodate other elements
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  starIcon: {
    marginRight: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    padding: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  addToCartButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Item;

