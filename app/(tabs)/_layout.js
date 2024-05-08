import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";

const _layout = () => {
  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="feed"
          options={{
            tabBarIcon: () => <Feather name="home" size={24} color="black" />,
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
            tabBarLabel: "USERS",
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: () => <AntDesign name="shoppingcart" size={24} color="black" />,
            tabBarLabel: "Cart",
          }}
        />

        <Tabs.Screen
          name="Procurement"
          options={{
            tabBarIcon: () => <AntDesign name="Sales" size={24} color="black" />,
            tabBarLabel: "Procurement",
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
