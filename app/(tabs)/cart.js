import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from '@firebase/firestore';
import { db } from '../../firebase/firebase';
import ItemAdmin from '../item_admin';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItemsRef = collection(db, 'cartItems');
        const querySnapshot = await getDocs(cartItemsRef);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items: ', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'cartItems', itemId));
      Alert.alert('Item removed from cart');
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);
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
            <ItemAdmin
              name={item.name}
              price={item.price}
              image={item.image}
              onDelete={() => handleRemoveItem(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={<ActivityIndicator size="large" color="#0000ff" />}
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
