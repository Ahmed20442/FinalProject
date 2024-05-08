import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { collection, onSnapshot, doc, deleteDoc } from '@firebase/firestore';
import { db } from '../../firebase/firebase';
import ItemCart from '../item_cart';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const usersRef = collection(db, 'users', userId, 'cartItems');
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCartItems(productList);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'users', userId, 'cartItems', itemId));
      Alert.alert('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        style={styles.productList}
        data={cartItems}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={[styles.productItem, { width: '50%' }]}>
            <ItemCart
              name={item.name}
              price={item.price}
              image={item.image}
              onDelete={() => handleRemoveItem(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={<Text>List Is Empty</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cartList: {
    flexGrow: 1,
  },
});
