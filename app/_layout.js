import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";

const _layout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerTintColor: "indigo",
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    headerTitle: "Home",
                    headerRight: () => (
                        <Pressable onPress={() => router.push("login")}>
                            <Text style={styles.link}>Login</Text>
                        </Pressable>
                    ),
                }}
            />

            <Stack.Screen
                name="Admin"
                options={{
                    headerShown: false,
                    headerTitle: "Admin",
                    headerRight: () => (
                        <Pressable onPress={() => router.push("Admin")}>
                            <Text style={styles.link}>Admin</Text>
                        </Pressable>
                    ),
                }}
            />


            {/* <Stack.Screen name="about" options={{ headerTitle: "Abouts" }} />
            <Stack.Screen
                name="blog/index"
                options={{ headerTitle: "All Blog Posts" }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="contact"
                options={{ headerTitle: "Contact", presentation: "modal" }}
            /> */}
        </Stack>
    );
};

export default _layout;

const styles = StyleSheet.create({
    link: {
        fontSize: 20,
        color: "indigo",
    },
});
