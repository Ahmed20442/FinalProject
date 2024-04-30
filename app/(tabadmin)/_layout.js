import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";

const _layout = () => {
  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="Admin"
          options={{
            tabBarIcon: () => <Feather name="home" size={24} color="black" />,
            tabBarLabel: "Admin",
          }}
        />

        <Tabs.Screen
          name="users"
          options={{
            tabBarIcon: () => <Feather name="user" size={24} color="black" />,
            tabBarLabel: "Users",
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
