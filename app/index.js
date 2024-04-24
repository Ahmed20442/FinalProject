import React, { useEffect, useState } from 'react';
import { StatusBar, Image, StyleSheet, Text, FlatList, TouchableOpacity, Pressable, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';


export default function App() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Food Image */}
      <Image
        source={require('../assets/img9.jpg')}
        style={styles.image}
        resizeMode="cover"
      />


      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.appName}>BurgerzzaHub</Text>


      <Text style={styles.descriptionText}>
        Explore a world of delicious burgers and more.
        Discover new flavors and satisfy your cravings!
      </Text>


      <TouchableOpacity style={styles.button} onPress={() => router.push('Login')}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 30,
  },
  image: {
    width: '100%',
    height: '50%',
    marginBottom: 32,
    marginTop: -140,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF4500',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});