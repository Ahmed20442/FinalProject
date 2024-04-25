
// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
// import { Link, router } from "expo-router";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// const CustomAlert = ({ message }) => (
//   <View style={styles.alertContainer}>
//     <Text style={styles.alertText}>{message}</Text>
//   </View>
// );

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState(null);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (username) {
//       handleLoginAndNavigate();
//     }
//   }, [username]);

//   const handleLogin = async () => {
//     try {
//       const auth = getAuth();
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const userId = user.uid;

//       const usersRef = collection(db, "users");
//       const userQuery = query(usersRef, where("userId", "==", userId));
//       const querySnapshot = await getDocs(userQuery);
//       if (!querySnapshot.empty) {
//         const userData = querySnapshot.docs[0].data();
//         return userData.name;
//       } else {
//         throw new Error("User not found");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setErrors("Error logging in:", error.message); // Access error message directly
//       return null;
//     }
//   };

//   const handleLoginAndNavigate = async () => {
//     const username = await handleLogin();
//     if (username !== null) {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const userId = user.uid;
//       router.push(`/profile?userId=${userId}&username=${username}&email=${email}`);
//     }
//   };

//   const handleLoginButtonPress = async () => {
//     setUsername(await handleLogin());
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={setEmail}
//         value={email}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={setPassword}
//         value={password}
//         secureTextEntry
//       />
//       <Pressable style={styles.button} onPress={handleLoginButtonPress}>
//         <Text style={styles.buttonText}>Login</Text>
//       </Pressable>
//       <Text style={styles.link}>
//         Don't have an account ? <Link href={"./signup"} style={styles.SignUp}>Sign Up</Link>
//       </Text>
//       <Text style={styles.link}>
//         <Link href={"/forgetPassword"} style={styles.SignUp}>Forgot Password?</Link>
//       </Text>
//       {errors && <CustomAlert message={errors} />}
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 32,
//     marginBottom: 30,
//     fontWeight: "bold",
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   SignUp: {
//     color: "blue",
//     textDecorationLine: 'underline'
//   },
//   button: {
//     backgroundColor: "blue",
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   link: {
//     marginTop: 10,
//     fontSize: 14,
//   },
//   alertContainer: {
//     // backgroundColor: "white",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   alertText: {
//     color: "red",
//     textAlign: "center",
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
      setErrors(error.message);
      return null;
    }
  };

  const handleLoginAndNavigate = async () => {
    const username = await handleLogin();
    if (username !== null) {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;
      router.push(`/profile?userId=${userId}&username=${username}&email=${email}`);
    }
  };

  const handleLoginButtonPress = async () => {
    setUsername(await handleLogin());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome To!</Text>
      <Text style={styles.appName}>BurgerzzaHub</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <Pressable style={styles.button} onPress={handleLoginButtonPress}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.link}>
        Don't have an account? <Link href={"./signup"} style={styles.SignUp}>Sign Up</Link>
      </Text>
      <Text style={styles.link}>
        <Link href={"/forgetPassword"} style={styles.SignUp}>Forgot Password?</Link>
      </Text>
      {errors && <CustomAlert message={errors} />}
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
  welcome: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
    color: '#333',
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
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#FF4500',
  },
  SignUp: {
    color: "#FF4500",
    textDecorationLine: 'underline'
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
});

export default LoginScreen;

