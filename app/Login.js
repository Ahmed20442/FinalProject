import { auth } from '../firebase/firebase';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { logIn } from '../firebase/auth';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Add your login logic here
  const handleLogin =async () => {
    try{
      await logIn(email,password)
      router.replace('/todo')
      
    }
    catch(e){
    
      window.alert(e.code || 'unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your E-mail address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account?
        <Link href={'/signup'}>
          <Text style={styles.linkText}> Sign Up</Text>
        </Link>
      </Text>
      <Text style={styles.signUpText}>
        
        <Link href={'/forgetPassword'}>
          <Text style={styles.linkText}> forgetPassword</Text>
        </Link>
      </Text>
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
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    // fontFamily: 'Arial',
  },
  loginButton: {
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
  signUpText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 20,
  },
  linkText: {
    color: 'blue',
  },
});

