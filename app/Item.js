// import React from 'react'; 
// import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native'; 
// import { router } from "expo-router"; 

// const screenWidth = Dimensions.get('window').width; 

// export default function Item({ name, price, image }) { 
//   return (
//     <View style={[styles.item, { width: screenWidth / 2 - 30 }]}>
//       <Pressable onPress={() => router.push(`/pressedItem?name=${name}&price=${price}&image=${image}`)}>
//         <Image source={{ uri: image }} style={styles.image} />
//       </Pressable>
//       <View style={styles.infoContainer}>
//         <Text numberOfLines={1} style={styles.name}>{name}</Text>
//         <Text style={styles.price}>${price}</Text>
//       </View>
//     </View>
//   );
// }


// const styles = StyleSheet.create({ 
//   item: { 
//     backgroundColor: 'lightgray',
//     borderRadius: 10,
//     padding: 5, 
//   }, 
//   image: { 
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 20, 
//   }, 
//   infoContainer: { 

//   }, 
//   name: { 
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,

//   }, 
//   price: { 
//     fontSize: 16,
//     color: '#888', 
//   } 
// });
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { db } from "../firebase/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
const screenWidth = Dimensions.get('window').width;

export default function Item({ name, price, image, userId, cartItemCount, setCartItemCount }) {
  const [quantity, setQuantity] = useState(1);

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

  return (
    <View style={styles.itemContainer}>
      <View>

      <Pressable onPress={() => router.push(`/pressedItem?name=${name}&price=${price}&image=${image}`)}>
                <Image source={{ uri: image }} style={styles.image} />
            </Pressable>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.price}>${price}</Text>
        <View style={styles.quantityContainer}>
          <Pressable onPress={decrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
        <Pressable onPress={addToCart} style={styles.cartIcon}>
          <Ionicons name="cart" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 5,
    width: screenWidth / 2 - 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    maxWidth:'70%'
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontWeight:"bold",
    
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
    backgroundColor: '#FF4500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartIcon:{
    alignItems:"center"
  }
});



