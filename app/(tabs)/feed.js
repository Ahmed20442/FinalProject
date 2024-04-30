import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, TextInput, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useLocalSearchParams, router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import Item from "../Item";

const Feed = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [originalData, setOriginalData] = useState([]);

  const searchItems = (searchFor) => {
    const filteredData = originalData.filter(item => item.name.toLowerCase().includes(searchFor.toLowerCase()));
    setData(filteredData);
  };

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

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const resetData = () => {
    setData(originalData);
    setText('');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for products"
            onChangeText={(t) => { setText(t); searchItems(t) }}
          />
          <Pressable
            onPress={() => searchItems(text)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
              styles.searchButton,
            ]}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
          <Pressable
            onPress={resetData}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
              styles.resetButton,
            ]}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        </View>

        <FlatList
          style={styles.productList}
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={[styles.productItem, { width: '50%' }]}>
              <Item
                name={item.name}
                price={item.price}
                image={item.image}
              />
            </View>
          )}
          ListEmptyComponent={<ActivityIndicator size="large" color="#0000ff" />}
        />
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
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
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  searchButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  resetButton: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productList: {
    width: '100%',
  },
  productItem: {
    padding: 10,
    marginBottom: 10,
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
