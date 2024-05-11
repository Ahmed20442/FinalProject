import React, { useState } from "react";
import { Link, router } from "expo-router";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Picker } from "@react-native-picker/picker";

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
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !age ||
      !gender ||
      !city ||
      !address ||
      !phoneNumber
    ) {
      setError("Please fill in all fields");
      return;
    }

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
        age: age,
        gender: gender,
        city: city,
        address: address,
        phoneNumber: phoneNumber,
        userId: userId,
      };
      await addDoc(collection(db, "users"), userData);

      router.push(`/feed?userId=${userId}&username=${username}&email=${email}`);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.createAccountText}>Create Account</Text>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appName}>Burgerizza</Text>

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
        <View style={styles.inputContainer}>
          <FontAwesome5 name="calendar-alt" size={24} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Age"
            onChangeText={setAge}
            value={age}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Picker
            style={styles.input}
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="map-marker-alt" size={24} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="City"
            onChangeText={setCity}
            value={city}
            autoCapitalize="words"
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="address-book" size={24} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Address"
            onChangeText={setAddress}
            value={address}
            autoCapitalize="sentences"
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="phone" size={24} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="phone-pad"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
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
