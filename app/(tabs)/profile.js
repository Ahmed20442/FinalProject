
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Profile = () => {
  const { userId, username, email } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{username ? `Welcome, ${username}` : "Welcome, Guest"}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ADD8E6',
  },
  text: {
    fontSize: 28,
  },
});
