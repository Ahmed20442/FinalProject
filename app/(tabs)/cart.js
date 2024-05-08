import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { collection, onSnapshot, doc, deleteDoc } from '@firebase/firestore';
import { db } from '../../firebase/firebase';
import ItemCart from '../item_cart';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchData = () => {
    const usersRef = collection(db, 'cartItems');
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCartItems(productList);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchData();

    return () => unsubscribe();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'cartItems', itemId));
      Alert.alert('Item removed from cart');
      // No need to manually update cartItems, it will be updated automatically by the onSnapshot listener
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
