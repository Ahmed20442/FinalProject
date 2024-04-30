import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { forgetPass } from '../firebase/auth';

export default function forgetPassword() {
  const [email, setEmail] = useState('')
  const handleForget = async () => {
    try {
      await forgetPass(email)
      router.replace('/Login')
      setEmail('')

    }
    catch (e) {
      window.alert(e.code)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.subtitle}>Enter your registered email address to reset your password.</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleForget}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>


      <Text style={styles.tagline}>Where Every Bite Tells a Flavorful Story!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  resetButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
});