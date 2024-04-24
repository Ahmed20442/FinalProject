import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useLocalSearchParams, router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { ActivityIndicator } from 'react-native';

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
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for"
            onChangeText={(t) => { setText(t); searchItems(t) }}
          />
          <Pressable
            onPress={() => searchItems(text)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.2 : 1,
              },
              styles.press,
            ]}
          >
            <Text>Search Items</Text>
          </Pressable>
          <Pressable
            onPress={resetData}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.2 : 1,
              },
              styles.press,
            ]}
          >
            <Text>Reset</Text>
          </Pressable>
        </View>
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
        <FlatList
          style={styles.backYellow}
          data={data}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              price={item.price}
              image={item.image}
            />
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
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ADD8E6',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  press: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginLeft: 10,
  },
  signOutButton: {
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  signOutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  userText: {
    fontSize: 20,
    marginBottom: 10,
  },
  backYellow: {
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
  },
});
