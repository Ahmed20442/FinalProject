// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { Link } from 'expo-router';
// import { useRouter } from 'expo-router';
// import { register } from '../firebase/auth';

// export default function SignUpPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async () => {
//     try {
//       await register(email, password)
//       router.replace(`/profile?userid ${userid}&username=${username}&email=${email}`);

//     }
//     catch (e) {

//       window.alert(e.code || 'unknown error');

//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Your Account</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         secureTextEntry
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>
//       <Text style={styles.signUpText}>
//         Already have an account?
//         <TouchableOpacity onPress={() => router.push('Login')}>
//           <Text style={styles.linkText}> Go Back</Text>
//         </TouchableOpacity>
//       </Text>


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




// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import { register } from '../firebase/auth';

// export default function SignUpPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   const handleSignUp = async () => {
//     try {
//       const { userid, username } = await register(email, password, name);
//       router.replace(`/Login`);
//     } catch (e) {
//       window.alert(e.code || 'unknown error');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Your Account</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         secureTextEntry
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <Text style={styles.signUpText}>
//         Already have an account?
//         <TouchableOpacity onPress={() => router.push('Login')}>
//           <Text style={styles.linkText}> Go Back</Text>
//         </TouchableOpacity>
//       </Text>

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
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
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

      // Save user data in Firestore collection
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
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
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
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  Login: {
    color: "blue",
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
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

export default SignUpPage;
