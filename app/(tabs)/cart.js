import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Alert, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, doc, deleteDoc } from '@firebase/firestore';
import { db } from '../../firebase/firebase';
import ItemCart from '../item_cart';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocalSearchParams, router } from 'expo-router';

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

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userId) {
      const usersRef = collection(db, 'users', userId, 'cartItems');
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCartItems(productList);
      });

      return unsubscribe;
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

  const totalOverallPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    router.push('../Checkout');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        <Text style={styles.title}>Cart</Text>
        <FlatList
          style={styles.productList}
          data={cartItems}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={[styles.productItem]}>
              <ItemCart
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                onDelete={() => handleRemoveItem(item.id)}
              />
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyCartText}>List Is Empty</Text>}
        />

        {cartItems.length > 0 && (
          <View style={styles.checkoutContainer}>
            <Text style={styles.totalOverallPrice}>Total Overall Price: ${totalOverallPrice.toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  safeArea: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
  productList: {
    flexGrow: 1,
  },
  totalOverallPrice: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  checkoutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
