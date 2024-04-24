import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const profile = () => {
  const { userId, username, email } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{username ? `Welcome, ${email}` : "Welcome, Guest"}</Text>
    </View>
  );
};

export default profile;

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
