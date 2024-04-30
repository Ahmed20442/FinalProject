import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable, FlatList, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import { ActivityIndicator } from 'react-native';

import Item from "../Item";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('productData');
      setItems(JSON.parse(storedData));
      setOriginalData(JSON.parse(storedData));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  const handleCheckout = () => {
    Alert.alert(
      'Order Placed',
      'Thank you for your order!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        <Text style={styles.appName}>BurgerzzaHub</Text>

        <Text style={styles.welcomeText}>Cart Page</Text>

        <FlatList
          style={styles.cartList}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={<Text>No items in cart</Text>}
        />

        <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </Pressable>
        
      </SafeAreaView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  safeArea: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF4500', 
  },
  welcomeText: {
    fontSize: 28,
    marginBottom: 20,
  },
  cartList: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

