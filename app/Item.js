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
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import { db } from "../firebase/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from '@firebase/firestore';

const screenWidth = Dimensions.get('window').width;

export default function Item({ name, price, image }) {
  const addToCart = async () => {
    try {
      await addDoc(collection(db, 'cartItems'), {
        name,
        price,
        image,
        quantity: 1
      });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };


  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
        <Pressable onPress={addToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
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
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
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
  }
});



