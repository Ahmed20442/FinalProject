import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { forgetPass } from '../firebase/auth';

export default function forgetPassword() {
  const [email,setEmail]=useState('')
  const handleForget=async()=>{
    try{
      await forgetPass(email)
      router.replace('/Login')
      setEmail('')

    }
    catch(e){
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
        onChangeText={(text)=> setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleForget}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 30,
    alignItems:'center'
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    // fontFamily: 'Arial',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
