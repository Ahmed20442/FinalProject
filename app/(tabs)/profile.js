// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from 'react-native';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
// import { db } from '../../firebase/firebase';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { useRouter } from 'expo-router';

// const Profile = () => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [currentlyEditing, setCurrentlyEditing] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
//       if (authenticatedUser) {
//         const userId = authenticatedUser.uid;
//         try {
//           const usersRef = collection(db, 'users');
//           const userQuery = query(usersRef, where('userId', '==', userId));
//           const querySnapshot = await getDocs(userQuery);

//           if (!querySnapshot.empty) {
//             const userData = querySnapshot.docs[0].data();
//             setUser(userData);

//             setFormData({
//               name: userData.name || '',
//               email: userData.email || '',
//               age: userData.age || '',
//               gender: userData.gender || '',
//               city: userData.city || '',
//               address: userData.address || '',
//               phoneNumber: userData.phoneNumber || '',
//             });

//             if (userData.image) {
//               setProfileImage(userData.image);
//             }
//           } else {
//             console.warn('User not found');
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       } else {
//         setUser(null);
//         setProfileImage(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleImageUpload = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }

//     const imageResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!imageResult.canceled && imageResult.assets[0].uri) {
//       try {
//         const querySnapshot = await getDocs(
//           query(collection(db, 'users'), where('name', '==', user.name))
//         );
//         if (querySnapshot.empty) {
//           alert('User not found.');
//           return;
//         }

//         const docRef = querySnapshot.docs[0].ref;

//         await updateDoc(docRef, {
//           image: imageResult.assets[0].uri,
//         });

//         setProfileImage(imageResult.assets[0].uri);
//       } catch (error) {
//         console.error('Error updating user document:', error);
//       }
//     } else {
//       console.log('Image selection canceled or URI not present:', imageResult);
//     }
//   };

//   const handleSaveChanges = async () => {
//     if (!user || !user.userId) {
//       console.error('User ID is undefined');
//       Alert.alert('Error', 'User data is missing');
//       return;
//     }

//     if (!formData.name || !formData.email) {
//       console.error('Required fields are undefined');
//       Alert.alert('Error', 'Required fields are missing');
//       return;
//     }

//     try {
//       const userId = user.userId;
//       const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
//       const querySnapshot = await getDocs(userQuery);
//       if (querySnapshot.empty) {
//         alert('User not found.');
//         return;
//       }

//       const docRef = querySnapshot.docs[0].ref;

//       await updateDoc(docRef, {
//         name: formData.name,
//         email: formData.email,
//         age: formData.age || '',
//         gender: formData.gender || '',
//         city: formData.city || '',
//         address: formData.address || '',
//         phoneNumber: formData.phoneNumber || '',
//       });

//       setUser(formData);
//       setCurrentlyEditing(false);
//       Alert.alert('Success', 'Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating user document:', error);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       const auth = getAuth();
//       await signOut(auth);
//       router.push("/Login");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   if (!user) {
//     return (
//       <View style={styles.signInPrompt}>
//         <Text style={styles.promptText}>Please sign in</Text>
//         <Pressable style={styles.signInButton} onPress={() => router.push('/login')}>
//           <Text style={styles.signInButtonText}>Sign In</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileBox}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={profileImage ? { uri: profileImage } : require('../../assets/th.jpg')}
//             style={styles.profileImage}
//           />
//           <Pressable onPress={handleImageUpload} style={styles.cameraIcon}>
//             <Ionicons name="camera" size={24} color="white" />
//           </Pressable>
//         </View>

//         <View style={styles.userInfo}>
//           {['name', 'email', 'age', 'gender', 'city', 'address', 'phoneNumber'].map((field) => (
//             <View key={field} style={styles.fieldContainer}>
//               {currentlyEditing === field ? (
//                 <TextInput
//                   style={styles.input}
//                   value={formData[field]}
//                   onChangeText={(text) => setFormData({ ...formData, [field]: text })}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   onBlur={() => setCurrentlyEditing(null)}
//                 />
//               ) : (
//                 <Text style={styles.userText}>
//                   {field.charAt(0).toUpperCase() + field.slice(1)}: {user[field]}
//                 </Text>
//               )}
//               <Pressable
//                 style={styles.editIcon}
//                 onPress={() => setCurrentlyEditing(field)}
//               >
//                 <Ionicons name="create-outline" size={24} color="gray" />
//               </Pressable>
//             </View>
//           ))}
//         </View>

//         {currentlyEditing && (
//           <Pressable style={styles.saveButton} onPress={handleSaveChanges}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </Pressable>
//         )}
//       </View>

//       <View>
//         <Pressable style={styles.signOutButton} onPress={handleSignOut}>
//           <Text style={styles.signOutButtonText}>Sign Out</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   fieldContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     width: '90%',
//   },
//   editIcon: {
//     padding: 10,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F3F4F6',
//   },
//   profileBox: {
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     marginBottom: 20,
//   },
//   imageContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
//   cameraIcon: {
//     position: 'absolute',
//     bottom: -10,
//     right: -10,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     borderRadius: 15,
//     padding: 5,
//   },
//   userInfo: {
//     alignItems: 'left',
//     padding: 20,
//   },
//   userText: {
//     fontSize: 18,
//     color: '#333',
//     marginBottom: 10,
//   },
//   input: {
//     borderColor: '#D1D5DB',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     fontSize: 18,
//     color: '#333',
//   },
//   saveButton: {
//     backgroundColor: '#3B82F6',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   saveButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   signOutButton: {
//     backgroundColor: '#EF4444',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     width: "60%",
//     alignSelf: 'center',
//   },
//   signOutButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//     alignSelf: 'center',
//   },
//   signInPrompt: {
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 20,
//   },
//   promptText: {
//     fontSize: 18,
//     color: '#1F2937',
//     marginBottom: 15,
//   },
//   signInButton: {
//     width: "50%",
//     backgroundColor: "#0a4a7c",
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   signInButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export default Profile;
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentlyEditing, setCurrentlyEditing] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      if (authenticatedUser) {
        const userId = authenticatedUser.uid;
        try {
          const usersRef = collection(db, 'users');
          const userQuery = query(usersRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUser(userData);

            setFormData({
              name: userData.name || '',
              email: userData.email || '',
              age: userData.age || '',
              gender: userData.gender || '',
              city: userData.city || '',
              address: userData.address || '',
              phoneNumber: userData.phoneNumber || '',
            });

            if (userData.image) {
              setProfileImage(userData.image);
            }
          } else {
            console.warn('User not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setProfileImage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imageResult.canceled && imageResult.assets[0].uri) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'users'), where('name', '==', user.name))
        );
        if (querySnapshot.empty) {
          alert('User not found.');
          return;
        }

        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
          image: imageResult.assets[0].uri,
        });

        setProfileImage(imageResult.assets[0].uri);
      } catch (error) {
        console.error('Error updating user document:', error);
      }
    } else {
      console.log('Image selection canceled or URI not present:', imageResult);
    }
  };

  const handleSaveChanges = async () => {
    if (!user || !user.userId) {
      console.error('User ID is undefined');
      Alert.alert('Error', 'User data is missing');
      return;
    }

    if (!formData.name || !formData.email) {
      console.error('Required fields are undefined');
      Alert.alert('Error', 'Required fields are missing');
      return;
    }

    try {
      const userId = user.userId;
      const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
      const querySnapshot = await getDocs(userQuery);
      if (querySnapshot.empty) {
        alert('User not found.');
        return;
      }

      const docRef = querySnapshot.docs[0].ref;

      await updateDoc(docRef, {
        name: formData.name,
        email: formData.email,
        age: formData.age || '',
        gender: formData.gender || '',
        city: formData.city || '',
        address: formData.address || '',
        phoneNumber: formData.phoneNumber || '',
      });

      setUser(formData);
      setCurrentlyEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating user document:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <View style={styles.signInPrompt}>
        <Text style={styles.promptText}>Please sign in</Text>
        <Pressable style={styles.signInButton} onPress={() => router.push('/login')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.imageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/th.jpg')}
            style={styles.profileImage}
          />
          <Pressable onPress={handleImageUpload} style={styles.cameraIcon}>
            <Ionicons name="camera" size={24} color="white" />
          </Pressable>
        </View>

        <View style={styles.userInfo}>
          {['name', 'email', 'age', 'gender', 'city', 'address', 'phoneNumber'].map((field) => (
            <View key={field} style={styles.fieldContainer}>
              {currentlyEditing === field ? (
                <TextInput
                  style={styles.input}
                  value={formData[field]}
                  onChangeText={(text) => setFormData({ ...formData, [field]: text })}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  onBlur={() => setCurrentlyEditing(null)}
                />
              ) : (
                <Text style={styles.userText}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}: {user[field]}
                </Text>
              )}
              <Pressable
                style={styles.editIcon}
                onPress={() => setCurrentlyEditing(field)}
              >
                <Ionicons name="create-outline" size={24} color="gray" />
              </Pressable>
            </View>
          ))}
        </View>

        {currentlyEditing && (
          <Pressable style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        )}
      </View>

      <View>
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '90%',
  },
  editIcon: {
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  profileBox: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#FF4500',
    borderRadius: 15,
    padding: 5,
  },
  userInfo: {
    alignItems: 'left',
    padding: 20,
  },
  userText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderColor: '#FF4500',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signOutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "60%",
    alignSelf: 'center',
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  signInPrompt: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  promptText: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 15,
  },
  signInButton: {
    width: "50%",
    backgroundColor: "#0a4a7c",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Profile;
