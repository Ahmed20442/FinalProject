import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PressedItem() {
  const { name, price, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={styles.name}>Name: {name}</Text>
        <Text style={styles.price}>Price: ${price}</Text>


        <Text style={{}}>
          Briefly introduce the topic of food and its universal appeal.
          Mention the diversity of cuisines worldwide and how they reflect the cultural richness of different regions.
          Explore different cuisines from around the world, such as Italian, Chinese, Mexican, Indian, and more.
          Discuss the unique flavors, spices, and ingredients that define each cuisine.
          Include personal anecdotes or stories related to food to make the article more engaging.
          Use descriptive language to evoke the senses and create a vivid picture for the readers.
          Provide recipes or cooking tips for readers to try at home.

        </Text>

      </View>
      <Pressable style={{ alignItems: 'center' }} onPress={() => router.replace(`feed`)}>
        <MaterialCommunityIcons name="logout" size={50} color="black" />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  price: {
    fontSize: 20,
    color: '#888',
  },
});
