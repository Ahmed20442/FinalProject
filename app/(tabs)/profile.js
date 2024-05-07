import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, Image } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getAuth, signOut, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import ImagePicker from 'react-native-image-picker';

const Profile = () => {
  const { userId, username, email: currentEmail } = useLocalSearchParams();
  const [fullName, setFullName] = useState(username);
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const auth = getAuth();
      if (newEmail !== currentEmail) {
        await updateEmail(auth.currentUser, newEmail);
      }
      if (password) {
        await updatePassword(auth.currentUser, password);
      }
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: avatar,
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setAvatar(source.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.appName}>BurgerzzaHub</Text>
        <Text style={styles.welcomeText}>Welcome</Text>
        <View style={styles.avatarContainer}>
          {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
          <Pressable onPress={handleChoosePhoto}>
            <Text style={styles.editIcon}>✎</Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              editable={editMode}
            />
            {editMode ? (
              <Pressable onPress={handleSaveChanges}>
                <Text style={styles.editIcon}>✎</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setEditMode(true)}>
                <Text style={styles.editIcon}>✎</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              // placeholder="Enter your email"
              value={newEmail}
              onChangeText={setNewEmail}
              editable={editMode}
            />
            {editMode ? (
              <Pressable onPress={handleSaveChanges}>
                <Text style={styles.editIcon}>✎</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setEditMode(true)}>
                <Text style={styles.editIcon}>✎</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={editMode}
            />
            {editMode ? (
              <Pressable onPress={handleSaveChanges}>
                <Text style={styles.editIcon}>✎</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setEditMode(true)}>
                <Text style={styles.editIcon}>✎</Text>
              </Pressable>
            )}
          </View>
        </View>
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  safeArea: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF4500',
  },
  welcomeText: {
    fontSize: 28,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  editIcon: {
    fontSize: 18,
    marginLeft: 10,
  },
  signOutButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
});
