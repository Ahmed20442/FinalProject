// import { auth } from '../firebase/firebase';
// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
// import { Link, router } from 'expo-router';
// import { logIn } from '../firebase/auth';
// import { getAuth } from 'firebase/auth';
// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   // Add your login logic here
//   const handleLogin = async () => {
//     try {
//       await logIn(email, password)
//       router.replace('/profile')

//     }
//     catch (e) {

//       window.alert(e.code || 'unknown error');
//     }
//   };
//   const handleLoginandnavigate = async () => {
//     const username = await handleLogin();
//     if (username !== null) {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const userid = user.uid;
//       if (userid === "FxKJEi0jlcNLdPlg2I04KxXzvNK2") {
//         router.replace('/Admin');
//       }
//       else {
//         router.replace(`/profile?userid ${userid}&username=${username}&email=${email}`);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>

//       {/* <Image 
//         source={require('./assets/img5.jpg')} 
//         style={styles.image}
//         resizeMode="cover"
//       /> */}

//       <Text style={styles.title}>Welcome Back!</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your E-mail address"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.loginButton} onPress={handleLoginandnavigate}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <Text style={styles.signUpText}>
//         Don't have an account?
//         <Link href={'/signup'}>
//           <Text style={styles.linkText}> Sign Up</Text>
//         </Link>
//       </Text>
//       <Text style={styles.signUpText}>

//         <Link href={'/forgetPassword'}>
//           <Text style={styles.linkText}> forgetPassword</Text>
//         </Link>
//       </Text>

//       {/* Tagline */}
//       <Text style={styles.tagline}>Where Every Bite Tells a Flavorful Story!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F8F8F8',
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//   },
//   // image: {
//   //   width: '100%',
//   //   height: '50%',
//   //   marginBottom: 32,
//   //   marginTop: 0, 
//   // },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   loginButton: {
//     backgroundColor: '#FF4500',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 18,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   signUpText: {
//     fontSize: 18,
//     color: '#666',
//     marginTop: 20,
//   },
//   linkText: {
//     color: '#FF4500',
//   },
//   tagline: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 10,
//   },
// });
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { Link, router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const CustomAlert = ({ message }) => (
  <View style={styles.alertContainer}>
    <Text style={styles.alertText}>{message}</Text>
  </View>
);

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (username) {
      handleLoginAndNavigate();
    }
  }, [username]);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.name;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors("Error logging in:", error.message); // Access error message directly
      return null;
    }
  };

  const handleLoginAndNavigate = async () => {
    const username = await handleLogin();
    if (username !== null) {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;
      if (userId === "CqtHCH6ZoCegKomjvNWTZFYDdi23") {
        router.replace('/Admin');
      } else {
        router.push(`/profile?userId=${userId}&username=${username}&email=${email}`);
      }
    }
  };

  const handleLoginButtonPress = async () => {
    setUsername(await handleLogin());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLoginButtonPress}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.link}>
        Don't have an account ? <Link href={"./signup"} style={styles.SignUp}>Sign Up</Link>
      </Text>
      <Text style={styles.link}>
        <Link href={"/forgetPassword"} style={styles.SignUp}>Forgot Password?</Link>
      </Text>
      {errors && <CustomAlert message={errors} />}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  SignUp: {
    color: "blue",
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    fontSize: 14,
  },
  alertContainer: {
    // backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  alertText: {
    color: "red",
    textAlign: "center",
  },
});
