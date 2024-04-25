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
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { register } from '../firebase/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async () => {
    try {
      const { userid, username } = await register(email, password, name);
      router.replace(`/Login`);
    } catch (e) {
      window.alert(e.code || 'unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

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
