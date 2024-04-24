import { auth } from '../firebase/firebase';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { logIn } from '../firebase/auth';
import { getAuth } from 'firebase/auth';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

<<<<<<< HEAD
  // Add your login logic here
  const handleLogin = async () => {
    try {
      await logIn(email, password)
=======
  const handleLogin =async () => {
    try{
      await logIn(email,password)
>>>>>>> cff7f844fe7e6c2a2aaf35b545370126f5f669c0
      router.replace('/todo')

    }
    catch (e) {

      window.alert(e.code || 'unknown error');
    }
  };
  const handleLoginandnavigate = async () => {
    const username = await handleLogin();
    if (username !== null) {
      const auth = getAuth();
      const user = auth.currentUser;
      const userid = user.uid;
      if (userid === "GqpEbypLN3Y2A5Dx2sQuaTyqyom1") {
        router.replace('/Admin');
      }
      else {
        router.replace(`/todo?userid ${userid}&username=${username}`);
      }
    }
  };

  return (
    <View style={styles.container}>
     
      {/* <Image 
        source={require('./assets/img5.jpg')} 
        style={styles.image}
        resizeMode="cover"
      /> */}

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
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginandnavigate}>
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

      {/* Tagline */}
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
  // image: {
  //   width: '100%',
  //   height: '50%',
  //   marginBottom: 32,
  //   marginTop: 0, 
  // },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  loginButton: {
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
  signUpText: {
    fontSize: 18,
    color: '#666', 
    marginTop: 20,
  },
  linkText: {
    color: '#FF4500',
  },
  tagline: {
    fontSize: 14,
    color: '#666', 
    marginTop: 10,
  },
});
