import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, TextInput, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useLocalSearchParams, router } from "expo-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Item from "../Item";
import { Ionicons } from '@expo/vector-icons';

const Feed = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

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
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('productData');
        const storedProductCount = storedData ? JSON.parse(storedData).length : 0;

        const querySnapshot = await getDocs(collection(db, "Products"));
        const firestoreProductCount = querySnapshot.size;

        if (storedProductCount !== firestoreProductCount) {
          const fetchedData = querySnapshot.docs.map(doc => doc.data());
          setData(fetchedData);
          setOriginalData(fetchedData);
          await AsyncStorage.setItem('productData', JSON.stringify(fetchedData));
        } else {
          setData(JSON.parse(storedData));
          setOriginalData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const searchItems = (searchFor) => {
    const filteredData = originalData.filter(item => item.name.toLowerCase().includes(searchFor.toLowerCase()));
    setData(filteredData);
  };

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddToCart = () => {
    setCartItemCount(prevCount => prevCount + 1);
    router.push("/cart");
    setCartItemCount(0);
    console.log("Add to cart clicked");
  };

  const resetData = () => {
    setData(originalData);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for products"
            onChangeText={(text) => searchItems(text)}
          />
          <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
          <Pressable onPress={handleAddToCart} style={styles.cartIcon}>
            <Ionicons name="cart" size={24} color="black" />
            <Text></Text>
            {cartItemCount > 0 && <Text style={styles.cartItemCount}>{cartItemCount}</Text>}
          </Pressable>
        </View>
        <FlatList
          style={styles.productList}
          data={data}
          numColumns={1}
          renderItem={({ item }) => (
            <View style={[styles.productItem, { width: '95%' }]}>
              <Item
                name={item.name}
                price={item.price}
                image={item.image}
                userId={userId}
                cartItemCount={cartItemCount}
                setCartItemCount={setCartItemCount}
              />
            </View>
          )}
          ListEmptyComponent={<ActivityIndicator size="large" color="#0000ff" />}
        />

      </SafeAreaView>
    </View>
  );
};

export default Feed;

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: '100%',
    marginTop: 40
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 40,
    marginRight: 10,
    marginLeft: 13,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    marginLeft: 10,
    top: 10,
  },
  cartIcon: {
    position: 'absolute',
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemCount: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 5,
  },
  productList: {
    width: '100%',
  },
  productItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    maxWidth: '100%', // Set the maximum width here
  },
  signOutButton: {
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
  signOutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
