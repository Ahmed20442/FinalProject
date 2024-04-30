import React, { useState } from "react";
import { Link, router } from "expo-router";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const CustomAlert = ({ message }) => (
  <View style={styles.alertContainer}>
    <Text style={styles.alertText}>{message}</Text>
  </View>
);

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      const userData = {
        name: username,
        email: email,
        password: password,
        userId: userId,
      };
      await addDoc(collection(db, "users"), userData);

      router.push(`/profile?userId=${userId}&username=${username}&email=${email}`);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.createAccountText}>Create Account</Text>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.appName}>BurgerzzaHub</Text>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={24} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="envelope" size={24} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={24} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={24} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          autoCapitalize="none"
          keyboardType="default"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.link}>
        Already have an account? <Link href={"./Login"} style={styles.Login}>Log in</Link>
      </Text>
      {error && <CustomAlert message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F8F8F8',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  createAccountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#FF4500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    paddingHorizontal: 50, 
  },
  Login: {
    color: "#FF4500",
    textDecorationLine: 'underline',
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
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  link: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  alertContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  alertText: {
    color: "red",
    textAlign: "center",
  },
  icon: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
});

export default SignUpPage;

