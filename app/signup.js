import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { register } from '../firebase/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const  handleSignUp =async () => {
    try{
      await register(email,password)
      router.replace('/todo')
      
    }
    catch(e){
    
      window.alert(e.code || 'unknown error');

    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Already have an account?
        <TouchableOpacity onPress={() => router.push('Login')}>
          <Text style={styles.linkText}> Go Back</Text>
        </TouchableOpacity>
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
    // fontFamily: 'Arial',
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
